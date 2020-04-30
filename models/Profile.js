const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Currently not being used but will be for the xpansion of a user profile if we include uploads etc.

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
