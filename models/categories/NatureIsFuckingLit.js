const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VideoSchema = new Schema({
  title: {
    type: String
  },
  vidLink: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  categoryTag: {
    type: String
  },
  thumbnail: {
    type: String
  }
});

module.exports = Video = mongoose.model("natureisfuckinglit", VideoSchema);
