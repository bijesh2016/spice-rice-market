const mongoose = require("mongoose");

const RefundSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },

        quantity: {
          type: Number,
          min: 1
        },

        amount: {
          type: Number
        }
      }
    ],

    refundType: {
      type: String,
      enum: ["full", "partial"],
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    reason: {
      type: String,
      enum: [
        "damaged",
        "wrong_item",
        "not_as_described",
        "cancelled_by_user",
        "cancelled_by_admin",
        "other"
      ]
    },

    status: {
      type: String,
      enum: ["requested", "approved", "processing", "refunded", "rejected"],
      default: "requested"
    },

    gateway: {
      provider: String,
      refundId: String,
      response: Object
    },

    requestedAt: {
      type: Date,
      default: Date.now
    },

    approvedAt: Date,
    refundedAt: Date,

    adminNote: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Refund", RefundSchema);
