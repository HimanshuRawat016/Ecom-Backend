const express = require("express");
const app = express();

const productRoutes = require("./productRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");

app.use("/products", productRoutes);
app.use("/categories", categoriesRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

module.exports = app;
