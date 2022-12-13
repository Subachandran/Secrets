// install required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// call express
const app = express();
// use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
// set-up public folder
app.use(express.static("public"));
// set view engine for ejs
app.set("view engine", "ejs");

// MongoDB
const uri =
  "mongodb+srv://JKSdb:JKS-mongo-shell-2001...@jks.tqqp75s.mongodb.net/";
mongoose.connect(
  uri,
  () => console.log("Connected DB succesfully"),
  (e) => console.error(e)
);
// Schema
const userSchema = mongoose.Schema({
  _id: String,
  password: String,
});
const userModel = mongoose.model("userDetail", userSchema);

// listen to PORT number
const portNum = process.env.PORT || 3000;
app.listen(portNum, async () => {
  console.log("Server started at Port number", portNum);
});

// declare home page
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// declare register page
app
  .route("/register")
  .get((req, res) => {
    res.render("register.ejs", {
      cssFile: "register-login.css",
      jsFile: "register-script.js",
    });
  })
  .post((req, res) => {
    console.log("Post request");
  });

// declare login page
app.get("/login", (req, res) => {
  res.render("login.ejs", { cssFile: "register-login.css" });
});
