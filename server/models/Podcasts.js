const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
  {
    frontImage: {
      type: String,
      required: true,
      unique: true,
    },
    audioFile: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Podcasts", podcastSchema);
