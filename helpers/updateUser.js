const db = require("../models/index");
const jwt = require("jsonwebtoken");

const updateUser = (req, res) => {
  const { username, email, phone, city, pincode, address } = req.body;
  db.Users.updateOne(
    { email: req.body.decodeEmail },
    {
      $set: {
        username: username,
        email: email,
        phone: phone,
        city: city,
        pincode: pincode,
        address: address,
      },
    }
  )
    .then((data) => {
      if (data.modifiedCount == 1) {
        db.Users.findOne({ email: req.body.email }).then((userInfo) => {
          if (userInfo) {
            const userData = {
              username: userInfo.username,
              email: userInfo.email,
              phone: userInfo.phone,
              city: userInfo.city,
              pincode: userInfo.pincode,
              address: userInfo.address,
              _id: userInfo._id,
              token: jwt.sign(
                {
                  username: userInfo.username,
                  email: userInfo.email,
                  _id: userInfo._id,
                },
                "stupidprogrammer"
              ),
              message: "User details has been updated successfully",
            };
            res.status(200).json(userData);
          } else {
            res.status(404).json({
              errMsg: "Unable to find user details!",
            });
          }
        });
      }
      else{
        res.status(500).json({msg: "New details are same as existing details"})
      }
    })
    .catch((err) => {
      res.json({ err: `I am error: ${err}` });
    });
    
};

module.exports = updateUser;