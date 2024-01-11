require("dotenv").config();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const db = require("../db/db");
const UserModel = require("../models/userModel");

const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SESSION_SECRET;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const user = await UserModel.getUserById(jwt_payload.user_id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    console.error("Error in JWT strategy:", error);
    return done(error, false);
  }
}));


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
  
      // Generate a JWT token
      const token = jwt.sign({ user_id: user.user_id }, process.env.SESSION_SECRET);
  
      // Return the token along with the user
      return done(null, { user, token });
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


const blacklistedTokens = new Set();

const isTokenBlacklisted = (token) => {
  return blacklistedTokens.has(token);
};

const ensureAuthenticated = (req, res, next) => {
  console.log('Token in headers:', req.headers.authorization);
  console.log('Request Headers:', req.headers);
  console.log('Session Data:', req.session);
  console.log('User in session:', req.user);

  // If req.user is already set, move to the next middleware
  if (req.user) {
    return next();
  }

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    console.log('Token not provided or malformed.');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extract the token
  const token = authorizationHeader.split(' ')[1];
  console.log('Token before verification:', token);

  // Verify the token
  jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log('Decoded Token:', decoded);

  // Check if the token is blacklisted
  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ message: 'Token revoked' });
  }
    // Attach the decoded user information to the request object
    req.user = decoded;

    // Continue with the next middleware or route handler
    next();
  });
};

module.exports = { initializePassport, ensureAuthenticated, isTokenBlacklisted, blacklistedTokens };
