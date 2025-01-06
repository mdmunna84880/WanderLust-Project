const User = require("../models/user");
const passport = require("passport")

module.exports.signup = async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
      })
      
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }

module.exports.signupForm = (req, res) => {
    res.render("users/signup");
  }

module.exports.loginForm = (req, res) => {
    res.render("users/login");
  }

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }

module.exports.logout = (req, res, next)=>{
    req.logOut((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success", "you are logout!");
      res.redirect("/listings");
    });
  }