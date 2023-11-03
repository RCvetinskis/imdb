const tvShowsDb = require("../Schemas/tvShowSchema");
const moviesDb = require("../Schemas/moviesSchema");
const response = require("../module/sendResponse");
const returnOne = require("../module/returnOne");

module.exports = {
  post_comment: async (req, res) => {
    const { comment, userId, category, showId } = req.body;
    const currentUser = await returnOne(userId);
    const currentShow = await returnOne(showId, category);
    const commentData = {
      comment,
      user: {
        username: currentUser.username,
        userId: currentUser._id,
        avatar: currentUser.avatar,
      },
      createdAt: new Date(),
    };
    currentShow.comments.push(commentData);
    await currentShow.save();
    return response(res, "Comment has been added", false, currentShow.comments);
  },
  get_comments: async (req, res) => {
    const showId = Number(req.query.showId);
    const category = req.query.category;
    const currentShow = await returnOne(showId, category);

    if (currentShow) {
      return response(
        res,
        "Comments sent to front",
        false,
        currentShow.comments
      );
    }
    return response(res, "Show was not found", true);
  },
  post_reply_comment: async (req, res) => {
    const { comment, commentId, userId, replyingToId, category, showId } =
      req.body;

    const currentUser = await returnOne(userId);
    const currentShow = await returnOne(showId, category);
    const replyingToUser = await returnOne(replyingToId);
    const currentCommentIndex = currentShow.comments.findIndex(
      (commentItem) => commentItem._id.toString() === commentId
    );
    const currentComment = currentShow.comments[currentCommentIndex];

    const replyingToUserObject = {
      username: replyingToUser.username,
      userId: replyingToUser._id,
      avatar: replyingToUser.avatar,
      createdAt: new Date(),
      _id: currentComment._id,
    };
    const currentUserOjbect = {
      username: currentUser.username,
      userId: currentUser._id,
      avatar: currentUser.avatar,
      createdAt: new Date(),
    };
    const replyComment = {
      comment,
      user: {
        username: currentUser.username,
        userId: currentUser._id,
        avatar: currentUser.avatar,
      },
      replying_to: replyingToUser ? replyingToUserObject : currentUserOjbect,
    };
    currentComment.reply_comments.push(replyComment);
    await currentShow.save();

    return response(
      res,
      "Reply comment added",
      false,
      currentComment.reply_comments
    );
  },
  get_reply_comments: async (req, res) => {
    const showId = Number(req.query.showId);
    const category = req.query.category;
    const commentId = req.query.commentId;
    const currentShow = await returnOne(showId, category);
    const currentCommentIndex = currentShow.comments.findIndex(
      (commentItem) => commentItem._id.toString() === commentId
    );
    const currentComment = currentShow.comments[currentCommentIndex];
    await currentShow.save();

    return response(
      res,
      "Reply comment added",
      false,
      currentComment.reply_comments
    );
  },
  rate: async (req, res) => {
    const { rating, userId, category, show } = req.body;

    const currentShow = await returnOne(show.id, category);
    // Check if the user has already rated the show
    const userRatingIndex = currentShow.ratings.findIndex(
      (entry) => entry.user.userId === userId
    );
    if (userRatingIndex !== -1) {
      // If the user has already rated the show, update their rating
      currentShow.ratings[userRatingIndex].rating = rating;
    } else {
      // If the user hasn't rated the show, add a new rating entry
      currentShow.ratings.push({ rating, user: { userId } });
    }

    await currentShow.save();
    return response(res, "Rating is updated", false, currentShow);
  },
};
