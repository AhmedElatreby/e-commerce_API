const passport = require("passport");
const UserModel = require("../models/user");

exports.getLogin = (req, res) => {
  req.flash("error", "");
  res.render("login");
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message);
      return res.redirect("/auth/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      console.log("Authentication successful:", req.user);
      return res.redirect("/dashboard");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.redirect("/auth/login");
  });
};
