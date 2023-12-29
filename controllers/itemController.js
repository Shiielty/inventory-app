const Item = require("../models/item")
const asyncHandler = require("express-async-handler")

// Display list of all Items.
exports.item_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item list")
})

// Display detail page for a specific item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Item detail: ${req.params.id}`)
})

// Display Item create form on GET
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create GET")
})

// Display Item create form on POST
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create POST")
})

// Display Item delete on GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete GET")
})

// Display Item delete on POST
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete POST")
})

// Display Item update on GET
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update GET")
})

// Display Item update on POST
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update POST")
})