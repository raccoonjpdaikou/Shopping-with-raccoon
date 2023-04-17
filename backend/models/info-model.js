const mongoose = require("mongoose");
const { Schema } = mongoose;

const infoSchema = new Schema(
  {
    id: { type: String },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Info", infoSchema);
