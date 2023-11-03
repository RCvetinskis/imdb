const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ratingsSchema = new Schema({
  ratings: [
    {
      rating: { type: Number, required: true, min: 1, max: 10 },
      user: {
        userId: { type: Schema.Types.Mixed, required: true },
      },
    },
  ],
});

module.exports = ratingsSchema;
