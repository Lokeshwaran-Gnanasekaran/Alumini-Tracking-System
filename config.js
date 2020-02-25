const localStrategy = require("passport-local");
const mongoose = require("mongoose");
const User = require("./models/usermodel");
const emailExistence = require("email-existence");
var bcrypt = require("bcrypt");
var getUserbyUsername = async function(username){
    var user1;
    await User.findOne({username:username}, function(err, user){
        if(!err)
        {
            user1=user;
        }
    })
    return user1;
}
var getUserbyId = async function(id){
    var user1;
    await User.findById(id,function(err,user){
        if(!err){
            user1 = user;
        }
    })
    console.log(user1 + " user1");
    return user1;
}
var getUserbyEmail = async function(email){
    var user1;
    await User.findOne({email : email},function(err,user){
        if(!err){
            user1 = user;
        }
    })
    return user1;
}
var getUserbyContact = async function(contact){
    let user1;
    await User.findOne({contact:contact},function(err,user){
        if(!err){
            user1 = user;
        }
    })
    console.log(user1);
    return user1;
}
var initialize = function(passport){
    console.log("ooo");
    var authenticateUserLogin = async function(req, email, password, done){     
        var user = await getUserbyEmail(email);
        if(!user){
            return done(null, false, req.flash("logError","Email not registered"));
        }
        bcrypt.compare(password, user.password, function(err, res) {
            if(err){
                return done(err);
            }
            if(res){
                return done(null, user, req.flash("success","Welcome to YelpCamp " + req.body.username));
            }
            return done(null, false, req.flash("logError","Password incorrect"));
        });
    }
    var authenticateUserRegister = async function(req, username, password, done){  
        console.log ("mang");
        await emailExistence.check(req.body.email, function(error, response){
            if(!response){
                console.log("lll")
                return done(null, false, req.flash("regError","Email doesn't exists"));
            }
        });     
        var user = await getUserbyEmail(req.body.email);
        if(user){
            return done(null, false, req.flash("regError","Email already registered"));
        }
        var user1 = await getUserbyUsername(username);
        if(user1){
            return done(null, false, req.flash("regError","Username already exist"));
        }
        var user2 = await getUserbyContact(req.body.contact);
        if(user2){
            return done(null, false, req.flash("regError","Username already exist"));
        }

        if(req.body.password === req.body.repassword){
            bcrypt.hash(password, 10, function(err, hash) {
                if(!err){
                    if(req.body.company_name){
                        User.create({username: username, email : req.body.email , password : hash,
                            dob:req.body.dob,
                            address:req.body.dob,
                            bio:req.body.bio,
                            interest:req.body.interest,
                            group:"Alumni",
                            img_url:req.body.img_url,
                            contact:req.body.contact,
                            jobs:{
                                company_name:req.body.company_name,
                                company_url:req.body.company_url,
                                company_address:req.body.address1,
                                logo_url:req.body.logo_url,
                                position:req.body.position,
                                start:req.body.start,
                                current:req.body.current,
                                currentprodetails:req.body.currentpro,
                                salary:req.body.salary,
                                jobrole:req.body.jobrole
                            }
                        },function(err,user1){
                            if(!err){
                               return done( null, user1, req.flash("success","Welcome to YelpCamp " + username));
                               
                            }
                        })
                    }
                    else {
                        User.create({username: username, email : req.body.email , password : hash,
                            dob:req.body.dob,
                            address:req.body.dob,
                            bio:req.body.bio,
                            interest:req.body.interest,
                            group:"Admin",
                            img_url:req.body.img_url,
                            contact:req.body.contact
                        },function(err,user1){
                            if(!err){
                               return done( null, user1, req.flash("success","Welcome to YelpCamp " + username));
                               
                            }
                        })
                    }
                }
                else{
                    return done(err);
                }
            })
        }
        else{
            return done(null, false, req.flash("regError","Passwords are different"));
        }
    }
    passport.use('local-login',new localStrategy({
        usernameField : "email",
        passReqToCallback: true
    },
    authenticateUserLogin));
    passport.use("local-register", new localStrategy({
        usernameField : "name",
        passReqToCallback : true },
    authenticateUserRegister));
    passport.serializeUser(function(user,done){
        console.log(user + "lll");
        done(null, user._id);
    })
    passport.deserializeUser(async function(id,done){
        console.log(id + "pp");
        User.findById(id,function(err,foundUser){
            done(null, foundUser);
        }) 
    })
}

module.exports = initialize;