const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  service: {
    type: mongoose.Types.ObjectId,
    ref: "MunicipalityService",
    required: [true, "Please provide service"],
  },
  applicant: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide applicant"],
  },
  note: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "inprogress", "completed", "pickedup"],
  },

  documents: {
    type: String,
    required: false,
  },

  Files: [
    {
      type: mongoose.Types.ObjectId,
      ref: "File",
      required: false,
    },
  ],
});

module.exports = mongoose.model("Application", ApplicationSchema);
