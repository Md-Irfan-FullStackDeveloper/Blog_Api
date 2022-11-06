const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "blog",
      required: true,
    },
  ],
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};