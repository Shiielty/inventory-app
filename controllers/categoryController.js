const { validationResult, body } = require("express-validator");
const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const category = require("../models/category");

// Display list of all Category.
exports.category_list = asyncHandler(async (req, res, next) => {
  // Get all categories
  const allCategories = await Category.find({}, "name")
    .sort({ name: 1 })
    .exec();

  res.render("category_list", {
    title: "Category List",
    category_list: allCategories,
  });
});

// Display detail page for a specific category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  // Get category detail
  const [category, itemByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name price").exec(),
  ]);

  if (category === null) {
    // Category not found
    const err = new Error("Category Not Found");
    err.status = 404;
    return next(err);
  }

  console.log(category, itemByCategory);
  res.render("category_detail", {
    title: "Category Detail",
    category_detail: category,
    items_category: itemByCategory,
  });
});

// Display Category create form on GET
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
});

// Handle Category create on POST.
exports.category_create_post = [
  // Validate and sanitize the name field.
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  body("description", "Description must not empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data.
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      const categoryExists = await Category.findOne({
        name: req.body.name,
      }).exec();
      if (categoryExists) {
        // Category exists, redirect to its detail page.
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        // New category saved. Redirect to category detail page.
        res.redirect(category.url);
      }
    }
  }),
];

// Display Category delete on GET
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of category and the asociated items
  const [category, itemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name").exec(),
  ]);

  if (category === null) {
    // No results.
    res.redirect("/categories");
  }

  console.log(category, itemsByCategory);
  res.render("category_delete", {
    title: "Delete Category",
    category: category,
    item_category: itemsByCategory,
  });
});

// Display Category delete on POST
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, itemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name").exec(),
  ]);

  if (itemsByCategory.length > 0) {
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      item_category: itemsByCategory,
    });
    return;
  } else {
    await Category.findByIdAndDelete(req.body.categoryid);
    res.redirect("/categories");
  }
});

// Display Category update on GET
exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  res.render("category_form", { title: "Create Category", category: category });
});

// Display Category update on POST
exports.category_update_post = [
  // Validate and sanitize the name field.
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  body("description", "Description must not empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data.
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      const categoryExists = await Category.findOne({
        name: req.body.name,
      }).exec();
      if (categoryExists) {
        // Category exists, redirect to its detail page.
        res.redirect(categoryExists.url);
      } else {
        const updatedCategory = await Category.findByIdAndUpdate(
          req.params.id,
          category,
          {}
        );
        res.redirect(updatedCategory.url);
      }
    }
  }),
];
