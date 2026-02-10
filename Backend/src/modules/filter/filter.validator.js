const joi=require('joi');

const FilterSchema=joi.object({
    name:joi.string().trim().required(),
    type:joi.string().valid("price", "category", "brand", "attribute", "tag").required(),
    slug:joi.string().lowercase(),
    category:joi.string().hex().length(24),
    options:joi.array().items(
        joi.object({
            label:joi.string().required(),
            value:joi.string().required(),
            count:joi.number().default(0)   
        })
    ),
    isActive:joi.boolean().default(true),
    displayOrder:joi.number().default(0),

})

module.exports={FilterSchema};