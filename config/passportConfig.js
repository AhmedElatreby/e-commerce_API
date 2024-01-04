const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { query } = require("../db/db");

// Function to authenticate a user
const authenticateUser = async (email, password, done) => {
  try {
    // Query the database to find a user with the provided email
    const result = await query("SELECT * FROM Users WHERE email = $1", [email]);

    // If no user found, return an error message
    if (result.rows.length === 0) {
      return done(null, false, { message: "No user with that email." });
    }

    // Extract the user from the query result
    const user = result.rows[0];

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is valid, return the user
    if (isPasswordValid) {
      return done(null, user);
    } else {
      // If the password is incorrect, return an error message
      return done(null, false, { message: "Password incorrect." });
    }
  } catch (error) {
    // If an error occurs during authentication, return the error
    return done(error);
  }
};

// Use the LocalStrategy with the authenticateUser function
passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

// Serialize the user to store in the session
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user.user_id);
});

// Deserialize the user from the session
passport.deserializeUser(async (id, done) => {
  try {
    // Query the database to find a user with the provided user_id
    const result = await query("SELECT * FROM Users WHERE user_id = $1", [id]);

    // Extract the user from the query result
    const user = result.rows[0];

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
    done(null, user.user_id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const result = await query("SELECT * FROM Users WHERE user_id = $1", [
        id,
      ]);
      const user = result.rows[0];
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initializePassport;
