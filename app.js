// install required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

ejs.delimiter = '/';
ejs.openDelimiter = '[';
ejs.closeDelimiter = ']';

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
var profileExists,
  isAccountCreated,
  invalidPwd = false;
app
  .route("/register")
  .get((req, res) => {
    res.render("register.ejs", {
      cssFile: "register-login.css",
      jsFile: "register-script.js",
    });
  })
  .post(async (req, res) => {
    let mailId = req.body.email;
    let pwd = req.body.createPassword;
    let mailIds = await userModel.findById(mailId).exec();
    if (mailIds) {
      profileExists = true;
      res.redirect("/login");
    } else {
      await userModel.insertMany([{ _id: mailId, password: pwd }], (err) => {
        if (!err) {
          isAccountCreated = true;
          res.redirect("/login");
        } else res.redirect("/register");
      });
    }
  });

// declare login page
app
  .route("/login")
  .get((req, res) => {
    if (profileExists) {
      res.render("login.ejs", {
        cssFile: "register-login.css",
        profileExists: true,
      });
      profileExists = false;
    } else if (isAccountCreated) {
      res.render("login.ejs", {
        cssFile: "register-login.css",
        isAccountCreated: true,
      });
      isAccountCreated = false;
    } else if (invalidPwd) {
      res.render("login.ejs", {
        cssFile: "register-login.css",
        invalidPwd: true,
      });
      invalidPwd = false;
    } else {
      res.render("login.ejs", { cssFile: "register-login.css" });
    }
  })
  .post(async (req, res) => {
    let mailId = req.body.email;
    let password = req.body.password;
    const userCred = await userModel.findById(mailId).exec();
    if (userCred?.password === password) {
      res.render("secrets");
    } else {
      invalidPwd = true;
      res.redirect("/login");
    }
  });
