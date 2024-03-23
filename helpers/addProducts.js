const db = require("../models/index");

const addProducts = async (req, res) => {
  const {name, category, subcategory, rating, price, image, description} = req.body
  const product = {
    name, 
    category, 
    subcategory, 
    rating, 
    price, 
    image, 
    description
  }
  await db.Products.create(product)
    .then((response) => {
      console.log(response);
      res.status(200).json({ products: response });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ Err: "Data not inserted!" });
    });
};

module.exports = addProducts;
