const db = require("../models/index");

const getLatestProducts = async (req, res) => {
  try {
    const response = await db.Products.find({}).sort({ _id: -1 }).limit(5);
    response?res.status(200).json(response):res.status(404).json({ msg: "I am failed" });
  } catch (err) {
    console.log(`Database Error: ${err}`);
    res.status(500).json({ errMSG: "Server Error" });
  }
};

module.exports = getLatestProducts;
