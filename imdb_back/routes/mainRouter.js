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
const { movies, tvShows, comment } = require("../controllers/showsController");
// user
router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/like_list", validateLikeList, likeList);
router.post("/dislike_list", validateDislikeList, dislikeList);
// shows
router.post("/movies", movies);
router.post("/tvShows", tvShows);
router.post("/comment", comment);

module.exports = router;
