const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();

const placeOrder = async (req, res) => {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
  
      const options = req.body;
      const order = await razorpay.orders.create(options);
  
      if (!order) {
        return res.status(500).json({ msg: "Error" });
      }
  
      res.status(200).json(order);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Error" });
    }
  }

  module.exports = placeOrder;