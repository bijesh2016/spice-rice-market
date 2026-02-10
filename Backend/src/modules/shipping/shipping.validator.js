const joi=require('joi');
const shippingModel = require('./shipping.model');

const shippingSchema=joi.object({
    orderId:joi.string().hex().length(24).required(),
    carrier:joi.string().required(),
    user:  joi.string().hex().length(24).required(),
    trackingNumber:joi.string().required(),
    status:joi.string().valid("pending", "shipped", "delivered", "returned").required(),
    shippingAddress:joi.object({
        street:joi.string().required(),
        city:joi.string().required(),
        state:joi.string().required(),
        postalCode:joi.string().required(),
        country:joi.string().required()
    }).required(),
    shippingMethod:joi.string().valid("standard", "express", "overnight").required(),
    shippingFee:joi.number().min(0).required(),
    estimatedDeliveryDate:joi.date().optional(),
    shippedDate:joi.date().optional(),
    deliveredDate:joi.date().optional(),
    returnedDate:joi.date().optional(),
    createdBy:joi.string().hex().length(24).optional(),
    updatedBy:joi.string().hex().length(24).optional()
});

module.exports={shippingSchema};