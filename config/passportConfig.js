const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { query } = require("../db/db");

const authenticateUser = async (email, password, done) => {
  try {
    const result = await query("SELECT * FROM Users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return done(null, false, { message: "No user with that email." });
    }

    const user = result.rows[0];

    // Convert the provided password to a string
    const userProvidedPassword = String(password);

    const isPasswordValid = await bcrypt.compare(
      userProvidedPassword,
      user.password
    );

    if (isPasswordValid) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Password incorrect." });
    }
  } catch (error) {
    return done(error);
  }
};

passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    const result = await query("SELECT * FROM Users WHERE user_id = $1", [id]);
    const user = result.rows[0];
    done(null, user);
  });
  
  function initializePassport(passport) {
    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  
    passport.serializeUser((user, done) => {
      done(null, user.user_id);
    });
  
    passport.deserializeUser(async (id, done) => {
      const result = await query("SELECT * FROM Users WHERE user_id = $1", [id]);
      const user = result.rows[0];
      done(null, user);
    });
  }
  
  module.exports = initializePassport;