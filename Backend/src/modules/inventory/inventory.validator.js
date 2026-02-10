const joi=require('joi');

const InventorySchema=joi.object({
    product:joi.string().hex().length(24).required(),
    sku:joi.string().required(),
    stock:joi.number().min(0).required(),
    reserved:joi.number().min(0),
    available:joi.number().min(0),
    lowStockThreshold:joi.number().min(0),
    status:joi.string().valid("in_stock", "low_stock", "out_of_stock"),
    warehouse:joi.string(),
    trackInventory:joi.boolean(),
    lastUpdatedBy:joi.string().hex().length(24)
});

module.exports={InventorySchema};