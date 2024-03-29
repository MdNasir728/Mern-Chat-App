const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    chats: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    },
  },
  { timeStamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
