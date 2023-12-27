#! /usr/bin/env node

console.log(
  'This script populates some test items and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createItems();
  await createCategories();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  category[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, price, inStock, category) {
  const itemdetail = {
    name: name,
    description: description,
    price: price,
    inStock: inStock,
  };
  if (category != false) itemdetail.category = category;

  const item = new Item(itemdetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding items");
  await Promise.all([
    categoryCreate(
      0,
      "Electronics",
      "Cutting-edge electronic gadgets and devices.",
    ),
    categoryCreate(
      1,
      "Fashion",
      "Trendy and stylish clothing and accessories.",
    ),
    categoryCreate(
      2,
      "Home",
      "Products for enhancing your home and lifestyle.",
    ),
    categoryCreate(
      3,
      "Sports",
      "Sports equipment and accessories for active lifestyles.",
    ),
  ]);
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(
      0,
      "Smartwatch",
      "Feature-rich smartwatch for fitness and notifications.",
      129.99,
      15,
      categories[0],
    ),
    itemCreate(
      1,
      "Sunglasses",
      "Stylish sunglasses for a trendy look.",
      49.99,
      30,
      categories[1],
    ),
    itemCreate(
      2,
      "Coffee Machine",
      "Premium coffee machine for brewing barista-quality coffee.",
      199.99,
      10,
      categories[2],
    ),
    itemCreate(
      3,
      "Running Shoes",
      "High-performance running shoes for athletes.",
      79.99,
      20,
      categories[3],
    ),
    itemCreate(
      4,
      "Bluetooth Earbuds",
      "Wireless earbuds for an immersive audio experience.",
      79.99,
      25,
      categories[0],
    ),
    itemCreate(
      5,
      "T-shirt",
      "Comfortable and stylish t-shirt for everyday wear.",
      19.99,
      50,
      categories[1],
    ),
    itemCreate(
      6,
      "Robot Vacuum",
      "Smart robot vacuum for convenient home cleaning.",
      299.99,
      8,
      categories[2],
    ),
    itemCreate(
      7,
      "Yoga Mat",
      "High-quality yoga mat for fitness and relaxation.",
      29.99,
      40,
      categories[3],
    ),
    itemCreate(
      8,
      "Gaming Mouse",
      "Precision gaming mouse for gamers.",
      49.99,
      15,
      categories[0],
    ),
    itemCreate(
      9,
      "Denim Jeans",
      "Classic denim jeans for a timeless look.",
      39.99,
      35,
      categories[1],
    ),
  ]);
}
