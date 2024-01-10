const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../db/db");

// Function to authenticate a user
const authenticateUser = async (email, password, done) => {
  console.log("Authenticating user:", email);
  try {
    const user = await db.oneOrNone("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);

    if (!user) {
      console.log("No user with that email.");
      return done(null, false, { message: "No user with that email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      console.log("Authentication successful!");
      return done(null, user);
    } else {
      console.log("Password incorrect.");
      return done(null, false, { message: "Password incorrect." });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return done(error);
  }
};

const initializePassport = (passport) => {
  console.log("Initializing Passport");
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    done(null, user.user_id);
  });

  passport.deserializeUser(async (user_id, done) => {
    console.log("Deserializing user with user_id:", user_id);
    try {
      const user = await db.oneOrNone(
        "SELECT * FROM Users WHERE user_id = $1",
        [user_id]
      );

      if (!user) {
        console.log("User not found during deserialization.");
        return done(null, false, {
          message: "User not found during deserialization.",
        });
      }

      done(null, user);
    } catch (error) {
      console.error("Error during deserialization:", error);
      done(error, null);
    }
  });
};

const ensureAuthenticated = (req, res, next) => {
  console.log("Session Data:", req.session);
  console.log("User in session:", req.user);

  if (req.user) {
    return next();
  }

  res.status(401).json({ message: "Unauthorized" });
};

module.exports = { initializePassport, ensureAuthenticated };
