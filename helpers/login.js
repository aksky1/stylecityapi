const db = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const login = (req, res) => {
    db.Users.findOne({ email: req.body.email }).then((userInfo) => {
      if (userInfo) {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const userData = {
            username: userInfo.username,
            email: userInfo.email,
            _id: userInfo._id,
            phone: userInfo.phone,
            city: userInfo.city,
            pincode: userInfo.pincode,
            address: userInfo.address,
            token: jwt.sign(
              {
                username: userInfo.username,
                email: userInfo.email,
                _id: userInfo._id,
              },
              process.env.JWT_SECRET
            ),
            message: "User logged in successfully!",
          };
  
          console.log(userData);
  
          res.status(200).json(userData);
        } else {
          res.status(404).json({
            errMsg: "Email or Password is incorrect!",
          });
        }
      } else {
        res.status(404).json({
          errMsg: "User does not exists!",
        });
      }
    });
  }

  module.exports = login;