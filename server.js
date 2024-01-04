require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PgSession = require("connect-pg-simple")(session);
const pool = require("./db/db");
const authRoutes = require("./routes/authRoutes"); // Add this line
const dashboardRoutes = require("./routes/dashboardRoutes"); // Add this line

const app = express();
const port = 3000;

app.set("view engine", "ejs");

const initializePassport = require("./config/passportConfig");

initializePassport(passport);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    store: new PgSession({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
      secure: true, // Change to true if using HTTPS
      httpOnly: true,
    },
  })
);

console.log("POOL:  ", pool);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());

app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  console.log("Session:", req.session);
  next();
});

// User routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
