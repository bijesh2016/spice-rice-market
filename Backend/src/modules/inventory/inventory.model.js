const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true
    },

    sku: {
      type: String,
      unique: true,
      required: true
    },

    stock: {
      type: Number,
      required: true,
      min: 0
    },

    reserved: {
      type: Number,
      default: 0
    },

    available: {
      type: Number,
      default: 0
    },

    lowStockThreshold: {
      type: Number,
      default: 5
    },

    status: {
      type: String,
      enum: ["in_stock", "low_stock", "out_of_stock"],
      default: "in_stock"
    },

    warehouse: {
      type: String,
      default: "default"
    },

    trackInventory: {
      type: Boolean,
      default: true
    },

    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", InventorySchema);
