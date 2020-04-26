const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  savedVids: [
    {
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
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
