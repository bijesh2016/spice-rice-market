const fileUploadSvc = require("../../services/fileupload.service");
const BlogModel = require("./blogs.model");
const mongoose = require("mongoose");
const slugify = require("slugify");
class blogService{
    createBlog=async(payload)=>{
        try{
            if(payload.title){
                let slug = slugify(payload.title, {lower: true});
                let existingCount = 1;
                let originalSlug = slug;
                while(await BlogModel.findOne({slug: slug})) {
                    slug = `${originalSlug}-${existingCount}`;
                    existingCount++;
                }
                payload.slug = slug;
            }
            if(payload.content){
                payload.excerpt=payload.content.substring(0,150);
            }
            if(payload.authorId){
                const authorId=typeof payload.authorId==="string"?payload.authorId:payload.authorId.toString();
            }
            if(payload.authorId && mongoose.Types.ObjectId.isValid(payload.authorId)){
                payload.author=new mongoose.Types.ObjectId(payload.authorId);
            }

            if(payload.date){
                payload.date=new Date(payload.date);
            }

            if(payload.imageFile){
                const uploadResult=await fileUploadSvc.uploadFile(payload.imageFile,"images");
                payload.image=uploadResult.filePath;
                delete payload.imageFile;
            }

            const blog=new BlogModel(payload);
            return await blog.save();
        }   catch(exception){
            throw exception;
        }
    }

    getBlogs=async(filter)=>{
        try{
            const query = filter || {};
            if (!query.status) {
                query.status = 'PUBLISHED';
            }
            const blogs=await BlogModel.find(query).sort({createdAt:-1});
            return blogs;
        }   catch(exception){
            console.error('Error in getBlogs:', exception);
            throw exception;
        }
    }
    getBlogById=async(id)=>{
        try{
            const blog=await BlogModel.findById(id);
            return blog;
        }
        catch(exception){
            throw exception;
        }
    }

    getBlogDetailById=async(id)=>{
        try{
            const blogDetail=await BlogModel.findById(id);
            return blogDetail;
        }
        catch(exception){
            throw exception;
        }
    }

    transformBlogData=async(blogData,files)=>{
        try{
            let payload={...blogData};
            if(files && files.featuredImage && files.featuredImage.length>0){
                payload.featuredImage=`/assets/uploads/images/${files.featuredImage[0].filename}`;
            }
            return payload;
        }
        catch(exception){
            throw exception;
        }
    }

    transformUpdateBlogData=async(blogData,files,oldData)=>{
        try{
            let payload={...blogData};
            if(files && files.featuredImage && files.featuredImage.length>0){
                payload.featuredImage=`/assets/uploads/images/${files.featuredImage[0].filename}`;
            }
            return payload;
        }
        catch(exception){
            throw exception;
        }
    }
    updateBlog=async(id,payload)=>{
        try{
            const updatedBlog=await BlogModel.findByIdAndUpdate(id,payload,{new:true});
            return updatedBlog;
        }
        catch(exception){
            throw exception;
        }
    }
    deleteBlog=async(id)=>{
        try{
            await BlogModel.findByIdAndDelete(id);
        }
        catch(exception){
            throw exception;
        }
    }

}

const BlogSvc=new blogService();
module.exports=BlogSvc;

