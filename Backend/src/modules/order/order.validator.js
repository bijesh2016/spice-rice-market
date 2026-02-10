const joi=require('joi');

const orderSchema=joi.object({
    customerId:joi.string().hex().length(24).required(),
    items:joi.array().items(joi.object({
        productId:joi.string().hex().length(24).required(),
        quantity:joi.number().min(1).required(),
        price:joi.number().min(0).required()
    })).min(1).required(),
    totalAmount:joi.number().min(0).required(),
    status:joi.string().valid("pending", "processing", "shipped", "delivered", "cancelled").required(),
    createdBy:joi.string().hex().length(24),
    updatedBy:joi.string().hex().length(24),
    orderDate:joi.date(),
    deliveryDate:joi.date(),
    checkoutMethod:joi.string().valid("online", "cod").required(),
    paymentStatus:joi.string().valid("paid", "unpaid", "refunded").required(),

    shippingAddress:joi.object({
        fullName:joi.string().required(),
        phone:joi.string().required(),
        addressLine1:joi.string().required(),
        addressLine2:joi.string().allow(""),
        city:joi.string().required(),   
        state:joi.string().required(),
        postalCode:joi.string().required(),
        country:joi.string().required()
    }).required(),  
    billingAddress:joi.object({
        fullName:joi.string().required(),
        phone:joi.string().required(),
        addressLine1:joi.string().required(),
        addressLine2:joi.string().allow(""),
        city:joi.string().required(),   
        state:joi.string().required(),
        postalCode:joi.string().required(),
        country:joi.string().required()
    }).required(),  
    paymentDetails:joi.object({
        method:joi.string().valid("khalti", "stripe", "esewa", "cod").required(),
        transactionId:joi.string().allow(""),
        paidAt:joi.date()
    }).required()
});


module.exports={orderSchema};