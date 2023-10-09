const express = require("express");
const router = express.Router();
const { getMovies } = require("../controllers/moviesController");

router.get("/get-movies", getMovies);

module.exports = router;
