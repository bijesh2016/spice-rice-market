const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    subtitle: {
      type: String,
      trim: true
    },

    image: {
      type: String,
      required: true
    },

    link: {
      type: String 
    },

    type: {
      type: String,
      enum: ["homepage_slider", "category_banner", "promotion_banner", "popup"],
      default: "homepage_slider"
    },

    startDate: {
      type: Date,
      default: Date.now
    },

    endDate: {
      type: Date
    },

    isActive: {
      type: Boolean,
      default: true
    },

    priority: {
      type: Number,
      default: 0 // Higher number = higher priority in display
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    targetAudience: {
      type: String,
      enum: ["all", "logged_in", "guest", "vip"],
      default: "all"
    },

    displayOnMobile: {
      type: Boolean,
      default: true
    },

    displayOnDesktop: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

BannerSchema.index({ isActive: 1, startDate: 1, endDate: 1, priority: -1 });

module.exports = mongoose.model("Banner", BannerSchema);
