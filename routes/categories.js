var express = require('express');
var router = express.Router();

// Require controllers module
const category_controller = require("../controllers/categoryController")

/// CATEGORY ROUTES ///

// GET request for creating an Category
router.get('/create', category_controller.category_create_get)

// POST request for creating an Category
router.post('/create', category_controller.category_create_post)

// GET request for delete an Category
router.get('/:id/delete', category_controller.category_delete_get)

// POST request for delete an Category
router.post('/:id/delete', category_controller.category_delete_post)

// GET request for update an Category
router.get('/:id/update', category_controller.category_update_get)

// POST request for update an Category
router.post('/:id/update', category_controller.category_update_post)

// GET request for detail of specific Category
router.get("/:id", category_controller.category_detail)

module.exports = router