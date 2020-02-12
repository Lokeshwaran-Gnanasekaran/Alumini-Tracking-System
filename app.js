const port = process.env.PORT || 4000;
var exp = require("express");
var app = exp();
var bp = require("body-parser");
var passport = require("passport");
var session = require('express-session');
var flash = require('req-flash');
var mang = require("mongoose");
var passportConfig = require("./config");
passportConfig(passport);
app.use(exp.static("public"));
app.use(bp.urlencoded({extended: true}));
app.set("view engine","ejs");

mang.connect("mongodb+srv://kavin1:kavin1@cluster0-htry7.mongodb.net/alumni?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true});

app.use(session({
    secret : "Im ok",
    resave : false,
    saveUninitialized : false
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.get("/profile",function(req,res){
    res.render("profile");
})