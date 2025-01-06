const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");
const usersController = require("../controllers/users");


router
.route("/signup")
.get(usersController.signupForm)
.post(wrapAsync(usersController.signup));


router
.route("/login")
.get(usersController.loginForm)
.post(saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  usersController.login
);

// ? Log out
router.get("/logout", usersController.logout);

module.exports = router;
