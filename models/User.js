const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
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
      thumbNail: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
