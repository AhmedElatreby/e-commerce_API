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
const { ensureAuthenticated } = require("./config/passportConfig");
const passportConfig = require("./config/passportConfig");

passportConfig.initializePassport(passport);

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new PgSession({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Middleware for authentication
app.use(passport.initialize());
app.use(passport.session());

// Flash messages, CORS, logging, security headers
app.use(flash());
app.use(cors());

// Middleware for logging and session handling
app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  console.log("Session before route:", req.session);
  next();
});

// Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/dashboard", ensureAuthenticated, dashboardRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);

// Ensure the cart routes come after authentication middleware
app.use("/cart", ensureAuthenticated, cartRoutes);

// Additional routes
app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
