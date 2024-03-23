const db = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const signup =  (req, res) => {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 12),
    };
  
    db.Users.create(data)
      .then((user) => {
        res.status(200).json({
          username: user.username,
          email: user.email,
          _id: user._id,
          token: jwt.sign(
            {
              username: user.username,
              email: user.email,
              _id: user._id,
            },
            process.env.JWT_SECRET
          ),
          message: "UserID created successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ Err: "User already exists!" });
      });
  }

  module.exports = signup;