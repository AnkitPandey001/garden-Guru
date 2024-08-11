
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const USER =require('../models/model.js');
const { jwt_secret } = require("../key.js");
const jwt = require("jsonwebtoken");
module.exports = USER;


router.post("/signup", (req, res) => {
  const {userType, name, userName, email, password,country,state,pincode } = req.body;

  if (!userType||!name || !email || !userName || !password||!country||!state||!pincode) {
    return res.status(422).json({ error: "Please add all required * filed" });
  }

  USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then(
    (savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "Email or UserName is already in use.." });
      }

      bcrypt.hash(password, 10).then((hashedPassword) => {

        const user = new USER({
          userType,
          name,
          email,
          userName,
          password:hashedPassword,
          country,
          state,
          pincode

        });

        user
          .save()
          .then((user) => {
            res.json({ message: "Registered successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Email and Password are needed." });
  }

  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    bcrypt.compare(password, savedUser.password)
      .then((doMatch) => {
        if(doMatch){
          const token = jwt.sign({ _id: savedUser.id }, jwt_secret);
          return res.status(200).json({token,message:"Sign in successfully",savedUser: { savedUser: savedUser } })
        }else{
          return res.status(401).json({error:"Invalid email or password."})
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Internal server error." });
      });

  }).catch((err) => {
    console.log(err);
    return res.status(500).json({ error: "Internal server error." });
  })
});

module.exports = router;
