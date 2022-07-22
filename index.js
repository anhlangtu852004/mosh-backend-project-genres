const mongoose = require("mongoose");
const express = require("express");
const app = express();

//router
const homeRoute = require("./routes/home.route");
const genresRoute = require("./routes/genres.route");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/genres")
  .then(() => {
    console.log("ket noi database thanh cong");
  })
  .catch((err) => {
    console.log("Khong the ket noi database", err.message);
  });

app.use("/api/genres", genresRoute);
app.use("/", homeRoute);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`web server is running port ${port}`);
});
