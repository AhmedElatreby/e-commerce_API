const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controller/authController");
const { ensureAuthenticated } = require("../config/passportConfig");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
// Use the passport.authenticate middleware to check the token
router.post('/logout', passport.authenticate('jwt', { session: false }), authController.logout);


module.exports = router;
