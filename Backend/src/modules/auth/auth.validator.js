const Joi = require("joi");

const registerDataDTO = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Name is required",
  }),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_,.])[a-zA-Z0-9!@#$%^&*-_,.]{8,25}$/,
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain a small letter, one capital letter, one digit and one of any special characters.",
    }),
  confirmPassword: Joi.string().equal(Joi.ref("password")).required(),
  phone: Joi.string().min(10).max(25).allow(null, ""),
  role: Joi.string()
    .regex(/^(admin|seller|customer)$/)
    .default("customer"),
  gender: Joi.string().allow("male", "female", "other").required(),
  dob: Joi.date().iso().allow(null, ""),
  address: Joi.object({
    billing: Joi.object({
      houseNo: Joi.string().allow(null, "").optional().default(null),
      toleName: Joi.string().allow(null, "").optional().default(null),
      wardNo: Joi.number()
        .min(1)
        .max(32)
        .allow(null, "")
        .optional()
        .default(null),
      district: Joi.string().allow(null, "").optional().default(null),
      municipalityName: Joi.string().allow(null, "").optional().default(null),
      state: Joi.string().allow(null, "").optional().default(null),
    })
      .optional()
      .default(null),
    shipping: Joi.object({
      houseNo: Joi.string().allow(null, "").optional().default(null),
      toleName: Joi.string().allow(null, "").optional().default(null),
      wardNo: Joi.number()
        .min(1)
        .max(32)
        .allow(null, "")
        .optional()
        .default(null),
      municipalityName: Joi.string().allow(null, "").optional().default(null),
      district: Joi.string().allow(null, "").optional().default(null),
      state: Joi.string().allow(null, "").optional().default(null),
    })
      .optional()
      .default(null),
  }),
});

const loginDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgetPasswordDTO = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordDTO = Joi.object({
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_,.])[a-zA-Z0-9!@#$%^&*-_,.]{8,25}$/,
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain a small letter, one capital letter, one digit and one of any special characters.",
    }),
  confirmPassword: Joi.string().equal(Joi.ref("password")).required(),
});

module.exports = {
  registerDataDTO,
  loginDTO,
  forgetPasswordDTO,
  resetPasswordDTO,
};
