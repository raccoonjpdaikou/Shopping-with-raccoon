const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    id: { type: String },
    comment: {
      type: String,
      required: true,
    },
    display: {
      type: Boolean,
      default: false,
    },
    reply: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
