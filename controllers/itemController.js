const { body, validationResult } = require("express-validator");
const Item = require("../models/item")
const Category = require("../models/category")
const asyncHandler = require("express-async-handler")

// Display list of all Items.
exports.item_list = asyncHandler(async (req, res, next) => {
  // Get all items
  const allItems = await Item.find({}, "name price").sort({name: 1}).exec();

  res.render("item_list", {
    title: "Item List",
    item_list: allItems
  })
})

// Display detail page for a specific item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  // Get item details
  const item = await Item.findById(req.params.id).populate("category").exec();

  if (item === null) {
    // No results.
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", {
    title: "Item Detail",
    item_detail: item
  })

  console.log(item)
})

// Display Item create form on GET
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name").sort({name: 1}).exec()

  res.render("item_form", {
    title: "Create Item",
    categories: allCategories
  })
})

// Display Item create form on POST
exports.item_create_post = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    next();
  },

  body("name", "Name must not be empty")
    .trim()
    .isLength({min: 1})
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({min: 1})
    .escape(),
  body("price", "Price must be more or equal than 0")
    .trim()
    .isFloat({min: 0})
    .escape(),
  body("inStock", "Stock must be more than 1 (integer)")
    .trim()
    .isInt({min: 1})
    .escape(),
  body("category.*").escape(),

  // Process request after validation
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a req
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock,
      category: req.body.category,
    })

    if (!errors.isEmpty()){
      const allCategories = await Category.find({}, "name").sort({name: 1}).exec()

      for (const category of allCategories) {
        if (item.category.includes(category._id)) {
          category.checked = "true";
        }
      }
      
      res.render("item_form", {
        title: "Create Item",
        categories: allCategories,
        item: item,
        errors: errors.array()
      })
    } else {
      await item.save()
      res.redirect(item.url)
    }
  }),
];

// Display Item delete on GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (item === null) {
    res.redirect("/items")
  }

  res.render("item_delete", {
    title: "Delete Item",
    item: item
  })
})

// Display Item delete on POST
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  await Item.findByIdAndDelete(req.body.itemid);
  res.redirect("/items")
})

// Display Item update on GET
exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [item, allCategories] = await Promise.all([
    Item.findById(req.params.id),
    Category.find({}, "name").sort({name: 1}).exec()
  ])

  allCategories.forEach((category) => {
    if (item.category.includes(category._id)) category.checked = "true";
  })

  if (item === null) {
    const err = new Error("Book not found");
    err.status = 404;
    next(err)
  }

  res.render("item_form", {
    title: "Create Item",
    categories: allCategories,
    item: item
  })
})

// Display Item update on POST
exports.item_update_post = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    next();
  },

  body("name", "Name must not be empty")
    .trim()
    .isLength({min: 1})
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({min: 1})
    .escape(),
  body("price", "Price must be more or equal than 0")
    .trim()
    .isFloat({min: 0})
    .escape(),
  body("inStock", "Stock must be more than 1 (integer)")
    .trim()
    .isInt({min: 1})
    .escape(),
  body("category.*").escape(),

  // Process request after validation
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a req
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock,
      category: req.body.category,
      _id: req.params.id
    })

    if (!errors.isEmpty()){
      const allCategories = await Category.find({}, "name").sort({name: 1}).exec()

      for (const category of allCategories) {
        if (item.category.includes(category._id)) {
          category.checked = "true";
        }
      }
      
      res.render("item_form", {
        title: "Create Item",
        categories: allCategories,
        item: item,
        errors: errors.array()
      })
    } else {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {})
      res.redirect(updatedItem.url)
    }
  }),
];