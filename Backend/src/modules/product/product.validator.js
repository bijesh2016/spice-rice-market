const Joi = require("joi");
const { Status } = require("../../config/constant");

const ProductDTO = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    price: Joi.number().min(100).required(),
    discount: Joi.number().min(0).max(80).default(0),
    description: Joi.string().allow(null, '').default(null),
    category: Joi.array().items(Joi.string().required()).required(),
    brand: Joi.string().allow(null,'').default(null),
    featured: Joi.bool().default(false),
    attributes: Joi.array().items(Joi.object({
        name: Joi.string(),
        value: Joi.array().items(Joi.string())
    })).allow(null, '').default(null).optional(),
    status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
    images: Joi.string().allow(null,'').default(null)
})


module.exports = {
    ProductDTO
}