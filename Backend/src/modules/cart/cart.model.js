const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },

        name: {
          type: String,
          required: true
        },

        price: {
          type: Number,
          required: true
        },

        quantity: {
          type: Number,
          required: true,
          min: 1
        },

        image: {
          type: String
        },

        variant: {
          size: String,
          color: String
        },

        subtotal: {
          type: Number,
          required: true
        }
      }
    ],

    totalItems: {
      type: Number,
      default: 0
    },

    totalPrice: {
      type: Number,
      default: 0
    },

    coupon: {
      code: String,
      discountAmount: Number
    },

    status: {
      type: String,
      enum: ["active", "converted", "abandoned"],
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);