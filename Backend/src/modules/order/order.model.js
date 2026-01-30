const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    checkout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Checkout",
      required: true
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },

        name: String,
        price: Number,
        quantity: Number,
        image: String,

        variant: {
          size: String,
          color: String
        },

        subtotal: Number
      }
    ],

    billingAddress: {
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

    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    },

    pricing: {
      subTotal: Number,
      tax: Number,
      shippingFee: Number,
      discount: Number,
      grandTotal: Number
    },

    payment: {
      method: {
        type: String,
        enum: ["khalti", "stripe", "esewa", "cod"],
        required: true
      },

      status: {
        type: String,
        enum: ["paid", "pending", "failed", "refunded"],
        default: "pending"
      },

      transactionId: String,
      paidAt: Date
    },

    orderStatus: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "returned"
      ],
      default: "placed"
    },

    notes: {
      customerNote: String,
      adminNote: String
    },

    isArchived: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
