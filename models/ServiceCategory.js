const mongoose = require("mongoose");

const ServiceCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide service name"],
    unique: true,
  },
  serviceSource: {
    type: String,
    enum: {
      values: ["citizen", "municipality"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  image: {
    type: String,
    required: false,
    default: "http://i.stack.imgur.com/34AD2.jpg",
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ServiceCategory", ServiceCategorySchema);
