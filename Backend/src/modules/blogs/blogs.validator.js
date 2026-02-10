const joi=require('joi');

const createBlogSchema=joi.object({
    title:joi.string().min(5).max(150).required(),
    content:joi.string().min(20).required(),
    description:joi.string().max(300).optional(),
    authorId:joi.string().hex().length(24).required(),
    tags:joi.array().items(joi.string().min(2).max(30)).optional(),
    isPublished:joi.boolean().optional(),
    publishedDate:joi.date().when('isPublished', {is: true, then: joi.required(), otherwise: joi.optional()}),
    coverImageUrl:joi.string().uri().optional(),
    author:joi.string().max(100).optional(),
    
}); 

module.exports={createBlogSchema};