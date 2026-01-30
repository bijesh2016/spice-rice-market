const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
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
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    title: {
      type: String,
      trim: true
    },

    comment: {
      type: String,
      trim: true
    },

    images: [
      {
        type: String
      }
    ],

    isVerifiedPurchase: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
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
RatingSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model("Rating", RatingSchema);
