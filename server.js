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

const morgan = require("morgan");
const helmet = require("helmet");

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
      secure: false, // Change to true if using HTTPS
      httpOnly: true,
    },
  })
);

// console.log("POOL:  ", pool);

// Use Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  console.log("Session:", req.session);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");

// User routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/cart", cartRoutes);

app.use((req, res) => {
  res.status(404).send("Not Found");
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1); // Exit the process or perform recovery logic
});

const pgp = require("pg-promise")({
  query: (e) => {
    console.log("QUERY:", e.query);
  },
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
