const mongoose = require("mongoose");

const FilterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: ["price", "category", "brand", "attribute", "tag"],
      required: true
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category" // Optional: filters can be category-specific
    },

    options: [
      {
        label: String,
        value: String, // Value used in query
        count: { type: Number, default: 0 } // Optional: number of products
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    },

    displayOrder: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

FilterSchema.index({ type: 1, category: 1, isActive: 1 });
FilterSchema.index({ slug: 1 });

module.exports = mongoose.model("Filter", FilterSchema);
