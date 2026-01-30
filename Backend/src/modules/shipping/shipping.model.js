const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    shippingAddress: {
      fullName: String,
      phone: String,
      email: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    },

    shippingMethod: {
      type: String,
      enum: ["standard", "express", "same_day", "pickup_point", "courier"],
      default: "standard"
    },

    shippingFee: {
      type: Number,
      default: 0
    },

    trackingNumber: {
      type: String,
      unique: true,
      sparse: true // Some orders may not have a tracking number (pickup)
    },

    carrier: {
      type: String // e.g., DHL, FedEx, Nepal Post
    },

    status: {
      type: String,
      enum: [
        "pending",
        "processed",
        "shipped",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "returned",
        "cancelled"
      ],
      default: "pending"
    },

    estimatedDelivery: Date,
    deliveredAt: Date,
    returnedAt: Date,
    adminNotes: String
  },
  { timestamps: true }
);

ShippingSchema.index({ order: 1 });
ShippingSchema.index({ user: 1 });
ShippingSchema.index({ trackingNumber: 1 });
ShippingSchema.index({ status: 1 });

module.exports = mongoose.model("Shipping", ShippingSchema);
