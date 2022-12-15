const mongoose = require("mongoose");

const CitizenServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
    required: [true, "Please provide service title"],
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "ServiceCategory",
    required: [true, "Please provide category"],
  },
  isPublished: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  location: {
    type: String,
    required: [true, "Please provide service location"],
  },
  fbLink: {
    type: String,
    required: false,
  },
  instaLink: {
    type: String,
    required: false,
  },
  linkedInLink: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  pictureGallery: {
    type: String,
    required: false,
    default: "http://i.stack.imgur.com/34AD2.jpg",
  },
  servicePhoneNumber: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("CitizenService", CitizenServiceSchema);
