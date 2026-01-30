import mongoose from "mongoose";

const DiscountSchema = new mongoose.Schema({
 code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },

    title: {
      type: String,
      trim: true
    },

    description: {
      type: String
    },

    type: {
      type: String,
      enum: ["percentage", "fixed", "free_shipping"],
      required: true
    },

    value: {
      type: Number,
      required: function () {
        return this.type !== "free_shipping";
      }
    },

    minPurchaseAmount: {
      type: Number,
      default: 0
    },

    maxDiscountAmount: {
      type: Number 
    },

    startDate: {
      type: Date,
      default: Date.now
    },

    endDate: {
      type: Date
    },

    usageLimitPerUser: {
      type: Number,
      default: 1
    },

    usageLimitTotal: {
      type: Number
    },

    usedCount: {
      type: Number,
      default: 0
    },

    applicableCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ],

    applicableProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

}, { timestamps: true });

DiscountSchema.index({ code: 1, isActive: 1 });
DiscountSchema.index({ startDate: 1, endDate: 1 });

export const DiscountModel = mongoose.model("Discount", DiscountSchema);
