const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const imdbUserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default:
      "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
  },
  likes: {
    category: {
      movie: { type: [Schema.Types.Mixed], default: [] },
      tv: { type: [Schema.Types.Mixed], default: [] },
    },
  },
  dislikes: {
    category: {
      movie: { type: [Schema.Types.Mixed], default: [] },
      tv: { type: [Schema.Types.Mixed], default: [] },
    },
  },
});
module.exports = mongoose.model("imdbUserSchema", imdbUserSchema);
