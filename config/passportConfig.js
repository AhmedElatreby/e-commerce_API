const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../db/db");

// Function to authenticate a user
const authenticateUser = async (email, password, done) => {
  try {
    // Query the database to find a user with the provided email
    const user = await db.oneOrNone("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);

    // If no user found, return an error message
    if (!user) {
      return done(null, false, { message: "No user with that email." });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is valid, return the user
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

// Serialize the user to store in the session
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user ? user.user_id : null);
});

// Deserialize the user from the session
passport.deserializeUser(async (id, done) => {
  try {
    // Query the database to find a user with the provided user_id
    const user = await db.oneOrNone("SELECT * FROM Users WHERE user_id = $1", [
      id,
    ]);

    // Log the user during deserialization
    console.log("Deserialized user:", user);

    // Return the user
    done(null, user);
  } catch (error) {
    // If an error occurs during deserialization, return the error
    done(error);
  }
});

// Initialize the Passport configuration
function initializePassport(passport) {
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
}

module.exports = initializePassport;
