const express = require('express');
const app = express();
const port = 3085;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");

const { User } = require("./models/User");

const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
require('dotenv').config();

mongoose.connect(process.env.mongoURI)
    .then(()=> console.log("Mongodb connected"))
    .catch(err=>console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users/register', async (req, res) => {
  try {
      const user = await new User(req.body);
      await user.save();
      return res.status(200).json({
          success: true
      })
  } catch (err) {
      console.log("register failed")
      return res.json({
        success: false, err
      });
  }
})

app.post("/api/users/login", async (req, res) => {
  try {
      const user = await User.findOne({email: req.body.email});
      //if one couldn't find users, send false response
      if(!user) {
          return res.json({
              loginSuccess: false,
              message: "Cannot find user email"
          })
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
          //if it does not match, return json 
          if(!isMatch) return res.json({ loginSuccess: false, message: "wrong password" });
          //if it matches, generate token
          user.generateToken( async (err, user) => {
              try {
                  //save token and send it via cookie
                  return res.cookie("x_auth", user.token).status(200).json({loginSuccess:true, userId : user._id})
              } catch {
                  return res.status(400).send(err);
              }
          })
      })

  } catch (err) {
      console.log(err)
  }
})

app.get('/api/users/auth', auth, (req, res)=> {
  //JS will reach here only if auth is true
  res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0? false: true,
      isAuth: true,
      email: req.user.email,
      name: req.user.lastname,
      role: req.user.role,
      image: req.user.image
  })
})

app.get("/api/users/logout", auth, async (req, res) => {
  try {
      const user = await User.findOneAndUpdate({ _id: req.user._id}, {token: ""})
      console.log(user);
      return res.status(200).send({success:true});
  } catch {
      return res.json({success: false, err});
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
