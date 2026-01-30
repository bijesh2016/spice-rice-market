const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
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

    checkout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Checkout"
    },

    amount: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      default: "NPR"
    },

    method: {
      type: String,
      enum: ["khalti", "stripe", "esewa", "cod"],
      required: true
    },

    status: {
      type: String,
      enum: [
        "initiated",
        "pending",
        "authorized",
        "paid",
        "failed",
        "refunded"
      ],
      default: "initiated"
    },

    gateway: {
      provider: String,          // khalti / stripe
      transactionId: String,     // idx / payment_intent
      referenceId: String,       // order ref at gateway
      response: Object           // raw gateway response (for audit)
    },

    paidAt: Date,
    refundedAt: Date,

    failureReason: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
