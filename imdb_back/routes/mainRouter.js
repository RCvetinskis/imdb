const express = require("express");
const router = express.Router();
const {
  register,
  login,
  authorized,
  logout,
  handle_show_like,
  handle_show_dislike,
  handle_show_seen,
  update_user,
} = require("../controllers/userController");
const {
  validateRegistration,
  validateLogin,
  validateHandleShowLike,
  validateHandleShowDislike,
  validateHandleShowSeen,
  validateUpdateUser,
} = require("../middleware/userValidator");
const { add_show, user_shows_list } = require("../controllers/showsController");
const {
  get_comments,
  post_comment,
  post_reply_comment,
  get_reply_comments,
  rate,
} = require("../controllers/userEngagementController");
const { validateAddShow } = require("../middleware/showValidator");
const {
  validateComment,
  validateReplyComment,
  validateGetReplyComments,
} = require("../middleware/userEngagementValidator");
// User Authentication
router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.get("/authorized", authorized);
router.get("/logout", logout);
router.put("/update_user", validateUpdateUser, update_user);

// User Show Interaction
router.post("/handle_show_like", validateHandleShowLike, handle_show_like);
router.post(
  "/handle_show_dislike",
  validateHandleShowDislike,
  handle_show_dislike
);
router.post("/handle_show_seen", validateHandleShowSeen, handle_show_seen);

//  Shows
router.post("/add_show", validateAddShow, add_show);
router.get("/user_shows_list", user_shows_list);

// User Engagement (Comments and Replies)
router.get("/get_comments", get_comments);
router.get("/get_reply_comments", validateGetReplyComments, get_reply_comments);
router.post("/post_comment", validateComment, post_comment);
router.post("/post_reply_comment", validateReplyComment, post_reply_comment);

// Ratings
router.post("/rate", rate);
module.exports = router;
