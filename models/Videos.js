const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Videos Schema
const VideosSchema = new Schema({
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
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ]
});

module.exports = Videos = mongoose.model("videos", VideosSchema);
