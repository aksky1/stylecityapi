const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token)

  jwt.verify(token, "stupidprogrammer", (err, decode) => {
    if (err) res.status(500).json({ errMsg: "Invalid token!" })
    else {
      req.body.decodeEmail = decode.email;
      next();
    }
  });
};

module.exports = verifyToken;
