const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = {
  username: { type: String, required: false },
  avatar: { type: String, required: false },
  userId: { type: Schema.Types.Mixed, required: false },
};
const commentSchema = new Schema({
  comment: { type: String, required: true },
  user: {
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    userId: { type: Schema.Types.Mixed, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  reply_comments: [
    {
      user,
      comment: { type: String, required: false },
      commentId: { type: Schema.Types.Mixed, required: false },
      replying_to: {
        user,
        _id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        createdAt: { type: Date, required: false },
      },
      createdAt: { type: Date, required: false },
    },
  ],
  likes: {
    user,
  },
  dislikes: {
    user,
  },
});
module.exports = commentSchema;
