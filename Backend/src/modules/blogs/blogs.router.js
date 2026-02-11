const blogsRouter=require("express").Router();
const blogCtrl=require("./blogs.controller");
const uploader=require("../../middlewares/file-upload.middleware");

blogsRouter.get("/",blogCtrl.getBlogs)
blogsRouter.get("/:id",blogCtrl.getBlogById)
blogsRouter.get("/:id",blogCtrl.getBlogDetailById)

blogsRouter.post("/",uploader('image').single("image"),blogCtrl.createBlog)

blogsRouter.delete("/:id",blogCtrl.deleteBlog)
blogsRouter.put("/:id",blogCtrl.updateBlog)

module.exports = blogsRouter;