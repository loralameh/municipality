const mongoose = require("mongoose");

const ProgramPromiseSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: {
      values: ["pending", "inprogress", "done"],
      message: "{VALUE} is not supported",
    },
    required: true,
    default: "pending",
  },
  promise: {
    type: String,
    required: true,
  },
});

const MemberSchema = new mongoose.Schema({
  member: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide member"],
  },
  role: {
    type: String,
    required: true,
  },
});

const MunicipalitySchema = new mongoose.Schema({
  isCurrentMunicipality: {
    type: Boolean,
    default: false,
    required: true,
  },

  vision: {
    type: String,
    required: false,
  },

  president: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide president id"],
  },

  members: [
    {
      type: MemberSchema,
      required: true,
    },
  ],

  image: {
    type: String,
    required: false,
    default: "http://i.stack.imgur.com/34AD2.jpg",
  },

  phoneNumber: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: [true, "Please enter a start Date"],
  },
  endDate: {
    type: Date,
    required: [true, "Please enter a end Date"],
  },
  electionProgram: [
    {
      type: ProgramPromiseSchema,
      required: [true, "Please enter election Program"],
    },
  ],
});

module.exports = mongoose.model("Municipality", MunicipalitySchema);
