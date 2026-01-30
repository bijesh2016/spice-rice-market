const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // One wishlist per user
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        addedAt: {
          type: Date,
          default: Date.now
        },
        variant: {
          size: String,
          color: String
        }
      }
    ]
  },
  { timestamps: true }
);

WishlistSchema.index({ user: 1 });
WishlistSchema.index({ "items.product": 1 });

module.exports = mongoose.model("Wishlist", WishlistSchema);
