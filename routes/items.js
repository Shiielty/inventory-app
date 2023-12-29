var express = require('express');
var router = express.Router();

// Require controllers module
const item_controller = require("../controllers/itemController")

/// ITEM ROUTES ///

// GET request for creating an Item
router.get('/create', item_controller.item_create_get)

// POST request for creating an Item
router.post('/create', item_controller.item_create_post)

// GET request for delete an Item
router.get('/:id/delete', item_controller.item_delete_get)

// POST request for delete an Item
router.post('/:id/delete', item_controller.item_delete_post)

// GET request for update an Item
router.get('/:id/update', item_controller.item_update_get)

// POST request for update an Item
router.post('/:id/update', item_controller.item_update_post)

// GET request for detail of specific Item
router.get("/:id", item_controller.item_detail)

module.exports = router