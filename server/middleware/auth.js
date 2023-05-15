const { User } = require("../models/User");

//authroization
const auth =  (req, res, next) => {
    //grab cookie from user request
    const token = req.cookies.x_auth;
    //decode token
    User.findByToken(token, function(err, user) {
        if(!user) return res.json({ isAuth: false, error: true });
        req.token = token;
        req.user = user;
        next();
    }); 
}

module.exports = { auth };
