const mongoose = require("mongoose");

const MunicipalityActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
    required: [true, "Please provide activity title"],
  },
  category: {
    type: String,
    required: [true, "Please provide category"],
    enum: ["activity", "project"],
  },
  description: {
    type: String,
    required: false,
  },

  cost: {
    type: Number,
    required: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  images: [
    {
      type: String,
      required: false,
      default: "http://i.stack.imgur.com/34AD2.jpg",
    },
  ],
  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model(
  "MunicipalityActivity",
  MunicipalityActivitySchema
);
