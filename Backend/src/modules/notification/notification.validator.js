const joi=require('joi');

const notificationSchema=joi.object({
    userId:joi.string().hex().length(24).required(),
    message:joi.string().required(),
    type:joi.string().valid("info", "warning", "error").required(),
    isRead:joi.boolean(),
    createdBy:joi.string().hex().length(24)
});

module.exports={notificationSchema};