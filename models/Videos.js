const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Create Videos Schema
const VideosSchema = new schema({
  title: {
    type: String
  },
  vidLink: {
    type: String
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

module.exports = Videos = mongoose.model("videos", VideosSchema);
