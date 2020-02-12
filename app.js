const port = process.env.PORT || 4000;
var exp = require("express");
var app = exp();
var bp = require("body-parser");
var passport = require("passport");
var session = require('express-session');
var flash = require('req-flash');
var mang = require("mongoose");
var user  = require("./model/usermodel");
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
app.get("/",function(req,res){
    res.render("landing");
})

app.get("/register",function(req,res){
    res.render("register");
})
app.post("/register",function(req,res){
    
     function(err,createdUser){
         console.log(createdUser);

     }
})
app.get("/login",function(req,res)
{
    res.render("login")

})
app.post("/login",loggedIn,passport.authenticate("local",{
    successRedirect:"/profile",
    failureRedirect:"/login"
}),function(req,res)
{

})
app.get("/logout",function(req,res)
{
    req.logout();
    res.redirect("/");
})
function loggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login")
}


app.get("/profile",function(req,res){
    res.render("profile");
})