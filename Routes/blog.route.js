const { Router } = require("express");
const {
  getAllBlogs,
  addBlog,
  getBlogById,
  deleteBlog,
  updateBlog,
} = require("../controllers/blog");
const { authentication } = require("../Middleware/authentication");

const blogRouter = Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/addBlog", authentication, addBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", authentication, deleteBlog);
blogRouter.put("/update/:id", authentication, updateBlog);

module.exports = {
  blogRouter,
};
