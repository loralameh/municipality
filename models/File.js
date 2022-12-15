import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    alias: "id",
    default: new mongoose.Types.ObjectId(),
  },

  path: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
    enum: ["pdf", "zip", "jpeg", "png"],
  },
});

module.exports = mongoose.model("File", FileSchema);
