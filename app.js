// install required modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const saltRounds = 10;

ejs.delimiter = "/";
ejs.openDelimiter = "[";
ejs.closeDelimiter = "]";

// call express
const app = express();
// use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
// set-up public folder
app.use(express.static("public"));
// set view engine for ejs
app.set("view engine", "ejs");

// MongoDB
const uri = process.env.MONGODB_CONNECTION_URI;
mongoose.connect(
  uri,
  () => console.log("Connected DB succesfully"),
  (e) => console.error(e)
);
// Schema
const userSchema = new mongoose.Schema({
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
var profileExists = (isAccountCreated = invalidPwd = false);
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
    let mailIds = await userModel.findById(mailId).exec();
    if (mailIds) {
      profileExists = true;
      res.redirect("/login");
    } else {
      bcrypt.hash(req.body.createPassword, saltRounds).then(async (hash) => {
        let newUser = userModel({ _id: mailId, password: hash });
        await newUser.save((err) => {
          if (!err) {
            isAccountCreated = true;
            res.redirect("/login");
          } else res.redirect("/register");
        });
      });
    }
  });

// declare login page
app
  .route("/login")
  .get((req, res) => {
    res.render("login.ejs", {
      cssFile: "register-login.css",
      profileExists,
      isAccountCreated,
      invalidPwd,
    });
    profileExists = isAccountCreated = invalidPwd = false;
  })
  .post(async (req, res) => {
    let mailId = req.body.email;
    const userCred = await userModel.findById(mailId).exec();
    const match = await bcrypt.compare(req.body.password, userCred?.password)
    if (match) {
      res.render("secrets");
    } else {
      invalidPwd = true;
      res.redirect("/login");
    }
  });
