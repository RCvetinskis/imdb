const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentsSchema = require("../Schemas/commentsSchema");
const ratingsSchema = require("./ratingsSchema");
const tvShowSchema = new Schema({
  id: {
    type: Schema.Types.Mixed,
    required: true,
  },
  media_type: {
    type: String,
    required: true,
  },
  // Additional dynamic data field
  dynamicData: {
    type: Schema.Types.Mixed,
    required: true,
  },
  comments: [commentsSchema],
  ratins: [ratingsSchema],
});

module.exports = mongoose.model("tvShowSchema", tvShowSchema);
