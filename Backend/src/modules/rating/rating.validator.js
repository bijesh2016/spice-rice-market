const joi=require('joi');

const RatingSchema=joi.object({
    user:joi.string().hex().length(24).required(),
    product:joi.string().hex().length(24).required(),
    order:joi.string().hex().length(24).required(),
    rating:joi.number().min(1).max(5).required(),
    title:joi.string().optional(),
    comment:joi.string().optional(),
    images:joi.array().items(joi.string().uri()).optional(),
    isVerifiedPurchase:joi.boolean().optional(),
    status:joi.string().valid("pending", "approved", "rejected").optional(),
    adminResponse:joi.object({
        message:joi.string().optional(),
        respondedAt:joi.date().optional()
    }).optional(),
    createdBy:joi.string().hex().length(24).optional(),
    updatedBy:joi.string().hex().length(24).optional()
});


module.exports={RatingSchema};