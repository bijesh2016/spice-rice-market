const joi=require('joi');

const createCartSchema=joi.object({
    userId:joi.string().hex().length(24).required(),
    items:joi.array().items().required()
        .items(
            joi.object({
                productId:joi.string().hex().length(24).required(),
                name:joi.string().min(3).max(100).required(),
                price:joi.number().min(0).required(),   
                quantity:joi.number().integer().min(1).required(),
                image:joi.string().uri().optional(),
                variant:joi.object({    
                    size:joi.string().max(50).optional(),
                    color:joi.string().max(50).optional()
                }).optional(),
                subtotal:joi.number().min(0).required()
            })
        ),
        couponCode:joi.string().max(50).optional(),
    totalItems:joi.number().integer().min(0).optional(),
    totalPrice:joi.number().min(0).optional()
});

module.exports={createCartSchema};