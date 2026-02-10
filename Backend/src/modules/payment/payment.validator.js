const joi=require('joi');

const PaymentSchema=joi.object({
    user:joi.string().hex().length(24).required(),
    order:joi.string().hex().length(24).required(),
    checkout:joi.string().hex().length(24).optional(),
    amount:joi.number().min(0).required(),
    currency:joi.string().default("NPR"),   
    method:joi.string().valid("khalti", "stripe", "esewa", "cod").required(),
    status:joi.string().valid("initiated", "pending", "authorized", "paid", "failed", "refunded").default("initiated"),
    gateway:joi.object({
        provider:joi.string().valid("khalti", "stripe").optional(),     
        transactionId:joi.string().optional(),     
        referenceId:joi.string().optional(),       
        response:joi.object().optional(),
    }).optional(),
    paidAt:joi.date().optional(),
    refundedAt:joi.date().optional(),
    createdBy:joi.string().hex().length(24).optional(),
    updatedBy:joi.string().hex().length(24).optional()
});

module.exports={PaymentSchema};