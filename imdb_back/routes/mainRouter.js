const express = require("express");
const router = express.Router();
const {
  register,
  login,
  likeList,
  dislikeList,
} = require("../controllers/userController");
const {
  validateRegistration,
  validateLogin,
  validateLikeList,
  validateDislikeList,
} = require("../middleware/userValidator");
const { movies, tvShows } = require("../controllers/showsController");
router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/like_list", validateLikeList, likeList);
router.post("/dislike_list", validateDislikeList, dislikeList);
router.post("/movies", movies);
router.post("/tvShows", tvShows);

module.exports = router;
