const mongoose = require("mongoose");
const { Schema } = mongoose;

const rateSchema = new Schema({
  id: { type: String },
  rate: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rate", rateSchema);
