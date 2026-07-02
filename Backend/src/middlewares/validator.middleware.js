const bodyValidator = (schema) => (req, res, next) => {
  if (!schema || typeof schema.validate !== "function") {
    return next();
  }

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(422).json({
      data: error.details.map((detail) => detail.message),
      message: "Validation failed",
      status: "VALIDATION_ERROR",
      options: null,
    });
  }

  req.body = value;
  next();
};

module.exports = { bodyValidator };
