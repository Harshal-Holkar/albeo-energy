const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const _ = require("lodash");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/AEcounsultingDB");
const customersSchema = {
    name: String,
    email: String,
    subject: String,
    message: String
  };
  const Customer = mongoose.model("Customer", customersSchema);

app.get("/", function (req, res) {
    res.render("home");
  });
  
app.get("/admin", function (req, res) {
    Customer.find({}, function (err, customers) {
        res.render("admin", {
            customers: customers
        });
      })
  });

app.post("/contact", function (req, res) {
  
    const customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    })
    customer.save();  
    res.redirect("/");
  
  });

app.listen(3000, function () {
    console.log("Server started on port 3000");
  });
  
