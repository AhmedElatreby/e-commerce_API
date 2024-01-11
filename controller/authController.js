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
  })(req, res, next);
};




exports.logout = (req, res) => {
  // Check if there is a valid user in the request
  console.log('User before logout:', req.user);
  req.logout();
  console.log('User after logout:', req.user);
  req.session.destroy();
  console.log('User after session destroy:', req.user);
  return res.status(200).json({ message: 'Logout successful' });
};


