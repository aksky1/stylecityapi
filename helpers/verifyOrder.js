const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const verifyOrder = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
      const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
      sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = sha.digest("hex");
      if(digest!==razorpay_signature){
        res.status(400).json({msg: "Transaction is not legit!"})
      }
      res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      });
  }

  module.exports = verifyOrder