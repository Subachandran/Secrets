// install required modules
const express = require("express");
const bodyParser = require("body-parser");
// call express
const app = express();
// use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
// set-up public folder
app.use(express.static("public"));
// set view engine for ejs
app.set("view engine", "ejs");

// listen to PORT number
const portNum = 3000;
app.listen(portNum, () => {
  console.log("Server started at Port number", portNum);
});

// declare home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// declare register page
app.get("/register", (req, res) => {
  res.render("register.ejs", {
    cssFile: "register-login.css",
    jsFile: "register-script.js",
  });
});

// declare login page
app.get("/login", (req, res) => {
  res.render("login.ejs", { cssFile: "register-login.css" });
});
