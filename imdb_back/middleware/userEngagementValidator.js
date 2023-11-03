const response = require("../module/sendResponse");
const returnOne = require("../module/returnOne");
module.exports = {
  validateComment: async (req, res, next) => {
    const { comment, userId, category, showId } = req.body;
    const currentUser = await returnOne(userId);
    if (!currentUser) return response(res, "User not found", true);
    const currentShow = await returnOne(showId, category);
    if (!currentShow) return response(res, "Show not found", true);

    if (!comment) return response(res, "No comment is provided", true);

    next();
  },
  validateReplyComment: async (req, res, next) => {
    const { comment, commentId, userId, replyingToId, category, showId } =
      req.body;

    const currentUser = await returnOne(userId);
    if (!currentUser) return response(res, "User not found", true);

    const currentShow = await returnOne(showId, category);
    if (!currentShow) return response(res, "Show not found", true);

    const currentCommentIndex = currentShow.comments.findIndex(
      (commentItem) => commentItem._id.toString() === commentId
    );
    if (currentCommentIndex === -1) {
      return response(res, "Comment not found", true);
    }
    if (!replyingToId)
      return response(res, "Id of users replying too not provided", true);

    if (!comment) return response(res, "No comment is provided", true);
    if (!commentId) return response(res, "No Comment id is provided", true);
    next();
  },
  validateGetReplyComments: async (req, res, next) => {
    const showId = Number(req.query.showId);
    const category = req.query.category;
    const commentId = req.query.commentId;

    const currentShow = await returnOne(showId, category);
    if (!currentShow) return response(res, "show not found", true);
    const currentCommentIndex = currentShow.comments.findIndex(
      (commentItem) => commentItem._id.toString() === commentId
    );
    if (currentCommentIndex === -1) {
      return response(res, "Comment not found", true);
    }

    if (!showId) return response(res, "show id not provided", true);
    if (!category) return response(res, "category not provided", true);
    if (!commentId) return response(res, "comment id  not provided", true);

    next();
  },
};
