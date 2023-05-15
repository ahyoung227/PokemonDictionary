const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        madlength: 50
    },
    email: {
        type: String,
        trim: true, 
        unique: 1
    },
    password: {
        type: String,
        minLength: 5,
    },
    lastname: {
        type: String,
        maxLength: 50
    },
    role: {
        type: Number, 
        default: 0
    },
    image: String,
    token: {
        type:String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', async function(next) {
    //encrypted with salt
    const user = this;
    if(user.isModified("password")) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(user.password, salt);
            // Store hash in the password DB.
            user.password = hash;
        } catch(err) {
            next(err);
        }
    } 
    next();
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        return cb(null, isMatch)
    })
}

userSchema.methods.generateToken = async function(cb) {
    //create jwt and save it in user schema
    const user = this;
    const token = jwt.sign(user._id.toHexString(), "secretToken");
    user.token = token;
    try {
        await user.save();
        cb(null, user);
    } catch (e) {
        console.log(e, "a token generation failed")
    }
}

userSchema.statics.findByToken = async function(token, cb) {
    const user = this;
    //check whether client's token and saved token is identical
    try {
        const decodedUserId = jwt.verify(token, "secretToken")
        const targetUser = await user.findOne({
            _id: decodedUserId, "token": token
        })
        cb(null, targetUser);
    } catch (err) {
        cb(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = { User };
