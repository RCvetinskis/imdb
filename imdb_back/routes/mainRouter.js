const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/moviesController");
const {
  validateRegistration,
  validateLogin,
} = require("../middleware/userValidator");
router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);

module.exports = router;
