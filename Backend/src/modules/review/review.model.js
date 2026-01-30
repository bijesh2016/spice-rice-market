const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    },

    rating: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
      required: true
    },

    title: {
      type: String,
      trim: true,
      maxlength: 120
    },

    content: {
      type: String,
      required: true,
      trim: true
    },

    images: [
      {
        type: String
      }
    ],

    pros: [String],
    cons: [String],

    isVerifiedPurchase: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    helpfulCount: {
      type: Number,
      default: 0
    },

    reportCount: {
      type: Number,
      default: 0
    },

    adminResponse: {
      message: String,
      respondedAt: Date
    }
  },
  { timestamps: true }
);

/**
 * One review per user per product
 */
ReviewSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
