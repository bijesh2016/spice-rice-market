const Joi = require("joi");
const { Status } = require("../../config/constants");

const BrandDTO = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
  image: Joi.string().allow(null,'').default(null),
})

module.exports = {
  BrandDTO
}