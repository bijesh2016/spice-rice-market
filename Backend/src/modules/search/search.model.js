const mongoose = require("mongoose");

const SearchSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      text: true // Full-text search
    },

    description: {
      type: String,
      text: true
    },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ],

    tags: [String],

    brand: String,

    price: Number,

    variants: [
      {
        sku: String,
        attributes: {
          size: String,
          color: String
        },
        price: Number
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    },

    ratings: {
      average: Number,
      count: Number
    },

    createdAt: Date,
    updatedAt: Date
  },
  { timestamps: true }
);

/**
 * Full-text index for product name + description + tags
 */
SearchSchema.index({ name: "text", description: "text", tags: "text" });
SearchSchema.index({ price: 1 });
SearchSchema.index({ categories: 1 });
SearchSchema.index({ brand: 1 });
SearchSchema.index({ isActive: 1 });
SearchSchema.index({ "variants.price": 1 });

module.exports = mongoose.model("Search", SearchSchema);
