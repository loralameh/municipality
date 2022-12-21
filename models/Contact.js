const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    citizen: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide citizen who wrote this form"],
    },
    municipalityMember: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [
        false,
        "Please provide the municipality Member who replyed to this form",
      ],
    },

    message: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
