const joi=require('joi');
const { productSchema } = require('../product/product.validator');
const { RatingSchema } = require('../rating/rating.validator');

const searchSchema=joi.object({
    product:productSchema.optional(),
    name:joi.string().optional(),
    description:joi.string().optional(),
    categories:joi.array().items(joi.string().hex().length(24)).optional(),
    priceRange:joi.object({
        min:joi.number().min(0).optional(),
        max:joi.number().min(0).optional()
    }).optional(),
    query:joi.string().required(),
    filters:joi.object().pattern(joi.string(), joi.alternatives().try(
        joi.string(),
        joi.number(),
        joi.boolean(),
        joi.array().items(joi.string(), joi.number(), joi.boolean())
    )).optional(),
    tag:joi.string().optional(),
    brand:joi.string().optional(),
    rating:RatingSchema.optional(),
    sortBy:joi.string().optional(),
    sortOrder:joi.string().valid("asc", "desc").optional(),
    page:joi.number().min(1).optional(),
    limit:joi.number().min(1).max(100).optional()
});

module.exports={searchSchema};