const mongoose = require("mongoose");

const MunicipalityServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
    required: [true, "Please provide service title"],
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "ServiceCategory",
    required: [true, "Please provide category"],
  },
  description: {
    type: String,
    required: false,
  },
  requiredDocs: [
    {
      type: String,
      required: false,
    },
  ],
  expectedTime: {
    type: String,
    required: false,
  },
  cost: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model(
  "MunicipalityService",
  MunicipalityServiceSchema
);
