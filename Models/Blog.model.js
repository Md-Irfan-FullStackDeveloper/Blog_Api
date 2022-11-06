const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: [{ type: String, required: true }],
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = {
  BlogModel,
};
