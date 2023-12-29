const Category = require("../models/category")
const Item = require("../models/item")
const asyncHandler = require("express-async-handler")

// Display list of all Category.
exports.category_list = asyncHandler(async (req, res, next) => {
  // Get all categories
  const allCategories = await Category.find({}, "name").sort({name: 1}).exec();

  res.render("category_list", {
    title: "Category List",
    category_list: allCategories
  })})

// Display detail page for a specific category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  // Get category detail
  const [category, itemByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({category: req.params.id}, "name price").exec()
  ])

  if (category === null) {
    // Category not found
    const err = new Error("Category Not Found")
    err.status = 404;
    return next(err)
  }

  console.log(category, itemByCategory)
  res.render("category_detail", {
    title: "Category Detail",
    category_detail: category,
    items_category: itemByCategory
  })
})

// Display Category create form on GET
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category create GET")
})

// Display Category create form on POST
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category create POST")
})

// Display Category delete on GET
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category delete GET")
})

// Display Category delete on POST
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category delete POST")
})

// Display Category update on GET
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category update GET")
})

// Display Category update on POST
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category update POST")
})