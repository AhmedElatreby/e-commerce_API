const passport = require("passport");
const UserModel = require("../models/userModel");

exports.getLogin = (req, res) => {
  req.flash("error", "");
  res.render("login");
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (err, { user, token }, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message);
      return res.redirect("/auth/login");
    }

    // Ensure req.logIn is called to serialize the user into the session
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Authentication successful:", req.user);

      // Send the token in the response
      res.status(200).json({ token });
    });
  })(req, res, next); // Move this line after the declaration of token
};

exports.logout = (req, res) => {
  req.logout(); // Passport exposes a logout() function on req that can be called to end the login session
  req.session.destroy(); // Destroy the session
  res.redirect("/auth/login");
};
