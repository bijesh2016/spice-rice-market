const {all} = require("axios");

class blogsController {
    createBlogs=async(req,res,next)=> {
        try {
            res.json({
                data:{},
                message: "Blogs Created",
                status: "BLOGS_CREATED_SUCCESSFULLY",
                options: null
            })
        } catch (exception) {
            next(exception)
        }
    }

    getBlogsById=async(req,res,next)=> {
        try{
            res.json({
                data:{},
                message: "Get Blogs by Id ",
                status: "BLOGS_BY_ID_SUCCESSFULLY",
                options: null
            })
        }catch(exception) {
            next(exception)
        }
    }

    getAllBlogs=async(req,res,next)=> {
        try{
            res.json({
                data:{},
                message:"Get all Blogs",
                status:"GET ALL BLOGS SUCCESSFULLY",
                options: null
            })
        }catch(exception) {
            next(exception)
        }
    }

    updateBlogs=async(req,res,next)=> {
        try{
            res.json({
                data:{},
                message: "Blogs Updated",
                status: "BLOGS_UPDATE_SUCCESSFULLY",
                options: null
            })
        }catch(exception) {
            next(exception)
        }
    }

    deleteBlogs=async(req,res,next)=> {
        try{
            res.json({
                data:{},
                message: "Blogs Deleted",
                status: "BLOGS_DELETED_SUCCESSFULLY",
                options: null
            })
        }catch(exception) {
            next(exception)
        }
    }
}

const blogsCtrl=new BlogsController();
module.exports=blogsCtrl;
