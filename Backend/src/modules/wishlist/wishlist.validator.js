const joi=require('joi');

const wishlistSchema=joi.object({
    user:joi.string().hex().length(24).required(),
    items:joi.number().min(0).optional(),
    products:joi.array().items(joi.string().hex().length(24)).required(),
    createdBy:joi.string().hex().length(24).optional(),
    updatedBy:joi.string().hex().length(24).optional()
});

module.exports={wishlistSchema};