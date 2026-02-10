const joi=require('joi');

const checkoutSchema=joi.object({
    user:joi.string().hex().length(24).required(),
    cart:joi.string().hex().length(24).required(),
    items:joi.array().items(
        joi.object({
            product:joi.string().hex().length(24).required(),
            name:joi.string().required(),
            price:joi.number().required(),
            quantity:joi.number().required(),
            image:joi.string().uri().required(),
            variant:joi.object({
                size:joi.string().optional(),
                color:joi.string().optional()
            }).optional(),
            subtotal:joi.number().required()
        })
    ).min(1).required(),
    billingAddress:joi.object({
        fullName:joi.string().required(),
        phone:joi.string().required(),
        email:joi.string().email().required(),
        addressLine1:joi.string().required(),
        addressLine2:joi.string().optional(),
        city:joi.string().required(),
        state:joi.string().required(),
        postalCode:joi.string().required(),
        country:joi.string().required()
    }).required(),
    shippingAddress:joi.object({
        fullName:joi.string().required(),
        phone:joi.string().required(),
        addressLine1:joi.string().required(),
        addressLine2:joi.string().optional(),
        city:joi.string().required(),
        state:joi.string().required(),
        postalCode:joi.string().required(),
        country:joi.string().required()
    }).required(),

totalAmount:joi.number().required(),
    paymentMethod:joi.string().valid('credit_card','paypal','bank_transfer').required(),
    status:joi.string().valid('pending','paid','shipped','delivered','cancelled').required(),
    createdAt:joi.date().optional(),
    updatedAt:joi.date().optional(),
    
});

module.exports={checkoutSchema};