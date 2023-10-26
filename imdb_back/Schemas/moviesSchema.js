const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  adult: {
    type: Boolean,
    required: false,
  },
  media_type: {
    type: String,
    required: true,
  },
  backdrop_path: {
    type: String,
    required: true,
  },
  genre_ids: {
    type: [Number],
    required: true,
  },
  id: {
    type: String || Number,
    required: true,
  },
  title: {
    type: String || Number,
    required: true,
  },
  overview: {
    type: String,
    required: true,
    default: "No description provided",
  },
  popularity: {
    type: Number,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  vote_count: {
    type: Number,
    required: true,
  },
  comments: [
    {
      comment: { type: String, required: true },
      user: {
        username: { type: String, required: true },
        avatar: { type: String, required: true },
        userId: { type: Schema.Types.Mixed, required: true },
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  ratings: [
    {
      rating: { type: Number, required: true, min: 1, max: 10 },
      user: {
        userId: { type: Schema.Types.Mixed, required: true },
      },
    },
  ],
  // Additional dynamic data field
  dynamicData: {
    type: Schema.Types.Mixed,
    required: false,
  },
});

module.exports = mongoose.model("moviesSchema", moviesSchema);
