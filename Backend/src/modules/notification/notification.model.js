const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },

  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  type:{
    type:String,
    required:true,
  },

  read: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const NotificationModel = mongoose.model("Notification", NotificationSchema);

module.exports = NotificationModel;
