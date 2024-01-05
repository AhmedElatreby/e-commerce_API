const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../db/db");

// Function to authenticate a user
const authenticateUser = async (email, password, done) => {
  try {
    const user = await db.oneOrNone("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);

    if (!user) {
      return done(null, false, { message: "No user with that email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Password incorrect." });
    }
  } catch (error) {
    return done(error);
  }
};

const initializePassport = (passport) => {
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user ? user.user_id : null);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.oneOrNone(
        "SELECT * FROM Users WHERE user_id = $1",
        [id]
      );
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

// const ensureAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) return next();
//   res.status(400).json({ message: "Login required." });
//   res.redirect("/login");
// };

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(400).json({ message: "Login required." });
};

module.exports = { initializePassport, ensureAuthenticated };
