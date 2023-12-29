var express = require('express');
var router = express.Router();
const asyncHandler = require("express-async-handler")

// Require controllers module
const index_controller = require("../controllers/indexController")
const item_controller = require("../controllers/itemController")
const category_controller = require("../controllers/categoryController")

/* GET home page. */
router.get('/', index_controller.index);

// GET request for display all Item
router.get("/items", item_controller.item_list)

// CATEGORY request for display all Category
router.get("/categories", category_controller.category_list)

module.exports = router;
