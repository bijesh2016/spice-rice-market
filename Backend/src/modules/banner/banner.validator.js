const joi=require('joi');

const createBannerSchema=joi.object({
    title:joi.string().min(3).max(100).required(),
    subtitle:joi.string().max(200).optional(),
    imageUrl:joi.string().uri().required(),
    linkUrl:joi.string().uri().optional(),
    isActive:joi.boolean().optional(),
    type:joi.string().valid("homepage_slider", "category_banner", "promotion_banner", "popup").optional(),
    startDate:joi.date().optional(),
    endDate:joi.date().greater(joi.ref('startDate')).optional(),
    priority:joi.number().integer().min(0).optional(),
    targetAudience:joi.string().valid("all", "logged_in", "guest", "vip").optional()
});

module.exports={createBannerSchema};