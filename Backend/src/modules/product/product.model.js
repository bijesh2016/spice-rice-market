const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    description: {
      type: String,
      required: true
    },

    shortDescription: {
      type: String
    },

    price: {
      type: Number,
      required: true
    },

    compareAtPrice: {
      type: Number
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ],

    brand: {
      type: String
    },

    images: [
      {
        type: String
      }
    ],

    thumbnail: {
      type: String
    },

    attributes: {
      type: Map,
      of: String
      // e.g. { color: "Black", material: "Cotton" }
    },

    variants: [
      {
        sku: String,
        attributes: {
          size: String,
          color: String
        },
        price: Number,
        compareAtPrice: Number,
        image: String,
        isActive: {
          type: Boolean,
          default: true
        }
      }
    ],

    ratings: {
      average: {
        type: Number,
        default: 0
      },
      count: {
        type: Number,
        default: 0
      }
    },

    tags: [String],

    seo: {
      title: String,
      description: String,
      keywords: [String]
    },

    isActive: {
      type: Boolean,
      default: true
    },

    isFeatured: {
      type: Boolean,
      default: false
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
