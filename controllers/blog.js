const { default: mongoose } = require("mongoose");
const { BlogModel } = require("../Models/Blog.model");
const { UserModel } = require("../Models/User.model");

const getAllBlogs = async (req, res) => {
  let blogs;
  try {
    blogs = await BlogModel.find();
  } catch (error) {
    return console.log(error);
  }

  if (!blogs) {
    return res.status(404).json({ msg: "Blogs not found" });
  }

  return res.status(200).json({ blogs });
};

const addBlog = async (req, res) => {
  const { title, description, image, user } = req.body;
  let userExist;

  try {
    userExist = await UserModel.findById(user);
  } catch (error) {
    return console.log(error);
  }

  if (!userExist) {
    return res.status(400).json({ msg: "User not found" });
  }

  const blog = new BlogModel({
    title,
    description,
    image,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    userExist.blogs.push(blog);
    await userExist.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }

  return res.status(200).json({ msg: "Blog added successful" });
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
  let blog;

  try {
    blog = await BlogModel.findById(id);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }

  if (!blog) {
    return res.status(400).json({ msg: "Can't find blog" });
  }

  return res.status(200).json({ blog });
};

const updateBlog = async (req, res) => {
  const { title, description, image } = req.body;
  const { id } = req.params;
  let blog;

  try {
    if (title && description && image) {
      blog = await BlogModel.findOneAndUpdate(
        { _id: id },
        {
          title,
          description,
          image,
        }
      );
    } else if (title && description) {
      blog = await BlogModel.findOneAndUpdate(
        { _id: id },
        {
          title,
          description,
        }
      );
    } else if (title) {
      blog = await BlogModel.findOneAndUpdate(
        { _id: id },
        {
          title,
        }
      );
    } else if (description) {
      blog = await BlogModel.findOneAndUpdate(
        { _id: id },
        {
          description,
        }
      );
    } else {
      blog = await BlogModel.findOneAndUpdate(
        { _id: id },
        {
          image,
        }
      );
    }
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  if (!blog) {
    res.status(400).json({ msg: "can't update" });
  }
  res.status(200).json({ blog });
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  let blog;

  try {
    blog = await BlogModel.findOneAndDelete({ _id: id }).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }

  if (!blog) {
    return res.status(400).json({ msg: "Blog deleting unsuccessful" });
  }

  return res.status(200).json({ msg: "Blog successfully deleted" });
};

module.exports = {
  getAllBlogs,
  addBlog,
  getBlogById,
  deleteBlog,
  updateBlog,
};
