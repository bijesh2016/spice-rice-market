const joi=require('joi');

const DiscountSchema=joi.object({
    code:joi.string().uppercase().trim().required(),

    title:joi.string().trim().optional(),

    description:joi.string().optional(),

    type:joi.string().valid("percentage","fixed","free_shipping").required(),

    value:joi.number().when('type',{
        is:joi.valid("percentage","fixed"),
        then:joi.required(),
        otherwise:joi.forbidden()
    }),

    minPurchaseAmount:joi.number().default(0),

    maxDiscountAmount:joi.number().optional(),

    startDate:joi.date().default(Date.now),

    endDate:joi.date().optional(),

    usageLimitPerUser:joi.number().default(1),

    usageLimitTotal:joi.number().optional()

})

module.exports={DiscountSchema}