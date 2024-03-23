const db = require("../models/index");

const getProducts = async (req, res) => {
  const { page, limit, name, category, subCategory } = req.query;
  const queryCategory = {};

  if (category) {
    queryCategory.category = category;
  }
  if (subCategory) {
    queryCategory.subcategory = subCategory;
  }
  if (name) {
    queryCategory.name = { $regex: name, $options: "i" };
  }
  if (category == "all") {
    delete queryCategory.category;
  }
  if (subCategory == "all") {
    delete queryCategory.subcategory;
  }

  const skip = (page - 1) * limit;
  console.log(page)
  try {
    const totalDocuments = await db.Products.countDocuments();
    const remainingDocuments = totalDocuments - skip;
    console.log(remainingDocuments);
    const products = await db.Products.find(name ? queryCategory : {})
      .skip(skip)
      .limit(limit);

    if (products && skip<totalDocuments) {
      console.log("Data sent successfully!");
      res.status(200).json(products);
    } else {
      console.log("Data not found!");
      res.status(500).json({ msg: "Data not found!" });
    }
  } catch (err) {
    console.log(`Database find error! ${err}`);
    res.status(500).json({ msg: "Database find error!" });
  }
};

module.exports = getProducts;
