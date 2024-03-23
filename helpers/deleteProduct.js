const db = require("../models/index");

const deleteProduct = async (req, res) => {
    try {
      const { _id } = req.body;
      const product = await db.Products.findByIdAndDelete(_id);
      if (product)
        res.status(200).json({ message: "Product deleted successfully" });
      else return res.status(404).json({ message: "Product not found" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
module.exports = deleteProduct;
