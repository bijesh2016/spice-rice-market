const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
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

    coupon: {
      code: String,
      discountType: {
        type: String,
        enum: ["percentage", "flat"]
      },
      discountValue: Number
    },

    paymentMethod: {
      type: String,
      enum: ["khalti", "stripe", "cod"],
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },

    checkoutStatus: {
      type: String,
      enum: ["initiated", "completed", "expired"],
      default: "initiated"
    },

    expiresAt: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Checkout", CheckoutSchema);
