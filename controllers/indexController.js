const Item = require("../models/item")
const Category = require("../models/category")
const asyncHandler = require("express-async-handler")

exports.index = asyncHandler(async (req, res, next) => {
  // Get total of items and categories
  const [numItems, numCategories] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec()
  ]);

  res.render("index", {
    title: "Inventory App",
    item_count: numItems,
    category_count: numCategories
  })
})