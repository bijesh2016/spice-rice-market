const {Status}=require('../../config/constant');
const BlogService=require('./blogs.service');
const { notifyCreate, notifyUpdate, notifyDelete } = require('../../utilities/notificationHelper');


class BlogController{
    createBlog=async(req,res,next)=>{
        try{
            const blogData=req.body;

            if (req.file) {
                blogData.image = `/uploads/images/${req.file.filename}`;
            }

            const createdBlog=await BlogService.createBlog(blogData);

            await notifyCreate(req.user?.id, "blog", createdBlog, req.app.get('io'));

            res.json({
                data:createdBlog,
                message:"Blog created successfully",
                status:"BLOG_CREATE_SUCCESS",
                option:null
            });
        }   catch(exception){
            next(exception);
        }

    }

    getBlogs=async(req,res,next)=>{
        try{
            const filter=req.query || {};
            const blogs=await BlogService.getBlogs(filter);
            res.json({
                data:blogs,
                message:"Blog list fetched successfully",
                status:"BLOG_LIST_SUCCESS",
                option:null
            });
        }   catch(exception){
            console.error('Error fetching blogs:', exception);
            next(exception);
        }
    }

    getBlogById=async(req,res,next)=>{
        try{
            const id=req.params.id;
            const blog=await BlogService.getBlogById(id);
            res.json({
                data:blog,
                message:"Blog detail fetched successfully",
                status:"BLOG_DETAIL_SUCCESS",
                option:null
            });
        }
        catch(exception){
            next(exception);
        }
    }

    getBlogDetailById=async(req,res,next)=>{
        try{
            const id=req.params.id;
            const blogDetail=await BlogService.getBlogDetailById(id);
            res.json({
                data:blogDetail,
                message:"Blog detail fetched successfully",
                status:"BLOG_DETAIL_SUCCESS",
                option:null
            });
        }
        catch(exception){
            next(exception);
        }
    }

    updateBlog=async(req,res,next)=>{
        try{
            const id=req.params.id;
            const payload={...req.body};

            // Handle file upload if new image is provided
            if (req.file) {
                payload.image = `/uploads/images/${req.file.filename}`;
            }

            const updatedBlog=await BlogService.updateBlog(id,payload);

            await notifyUpdate(req.user?.id, "blog", updatedBlog, req.app.get('io'));

            res.json({
                data:updatedBlog,
                message:"Blog updated successfully",
                status:"BLOG_UPDATE_SUCCESS",
                option:null
            });
        }
        catch(exception){
            next(exception);
        }
    }
    deleteBlog=async(req,res,next)=>{
        try{
            const id=req.params.id;
            const deletedBlog = await BlogService.deleteBlog(id);

            await notifyDelete(req.user?.id, "blog", deletedBlog, req.app.get('io'));

            res.json({
                data:null,
                message:"Blog deleted successfully",
                status:"BLOG_DELETE_SUCCESS",
                option:null
            });
        }
        catch(exception){
            next(exception);
        }
    }
}

const blogCtrl=new BlogController();
module.exports=blogCtrl;