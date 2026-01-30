const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    description: {
      type: String,
      trim: true
    },

    image: {
      type: String
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null
    },

    level: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    },

    displayOrder: {
      type: Number,
      default: 0
    },

    attributes: [
      {
        name: String,      // e.g. Size, Color
        values: [String]   // e.g. ["S", "M", "L"]
      }
    ],

    seo: {
      title: String,
      description: String,
      keywords: [String]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
