const joi=require('joi');

const createCategorySchema=joi.object({
    name:joi.string().min(3).max(100).required(),
    description:joi.string().max(500).optional(),   
    image:joi.string().uri().optional(),
    parentId:joi.string().hex().length(24).optional().allow(null),
    level:joi.number().integer().min(0).optional(),         
    isActive:joi.boolean().optional(),
    displayOrder:joi.number().integer().min(0).optional(),
    attributes:joi.array().items(   
        joi.object({
            name:joi.string().min(2).max(50).required(),
            values:joi.array().items(joi.string().min(1).max(50)).required()
        })
    ).optional(),
    seo:joi.object({
        title:joi.string().max(70).optional(),
        description:joi.string().max(160).optional(),
        keywords:joi.array().items(joi.string().min(1).max(50)).optional()
    }).optional()


});
module.exports={createCategorySchema};