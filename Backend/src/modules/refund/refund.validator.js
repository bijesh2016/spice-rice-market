const joi=require('joi');

const RefundSchema=joi.object({
    user:joi.string().hex().length(24).required(),
    order:joi.string().hex().length(24).required(),
    product:joi.string().hex().length(24).required(),
    amount:joi.number().min(0).required(),
    reason:joi.string().required(),
    status:joi.string().valid("requested", "processing", "approved", "rejected", "refunded").default("requested"),
    refundType:joi.string().valid("full", "partial").required(),
    createdBy:joi.string().hex().length(24).optional(),
    updatedBy:joi.string().hex().length(24).optional(),
    payment:joi.string().hex().length(24).required(),
    items:joi.array().items(joi.object({
        product:joi.string().hex().length(24).required(),
        quantity:joi.number().min(1).required(),
        amount:joi.number().min(0).required()
    })).required(),
gateway:joi.object({
        provider:joi.string().valid("khalti", "stripe").optional(),     
        transactionId:joi.string().optional(),
        referenceId:joi.string().optional(),       
        response:joi.object().optional(),
    }).optional(),
})

module.exports={RefundSchema};