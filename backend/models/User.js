const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  image: {
    type: String,
    default: ""
  },
  joined: {
    type: String
  }
});

module.exports = mongoose.model("User", userSchema);