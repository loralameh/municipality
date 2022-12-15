const mongoose = require("mongoose");

const ElectricityBillSchema = new mongoose.Schema({
  reciever: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide applicant"],
  },
  note: {
    type: String,
    required: false,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },

  pricePerKiloWat: {
    type: String,
    required: true,
  },

  totalElecConsumption: {
    type: Number,
    required: true,
  },

  taxes: {
    type: Number,
    required: true,
    default: 0,
  },

  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("ElectricityBill", ElectricityBillSchema);
