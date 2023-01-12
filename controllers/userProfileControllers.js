const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getProfile = async (req, res) => {
  const { userId } = req.user;
  const profile = await User.findById(userId).select("-password");
  if (!profile) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  res.status(StatusCodes.OK).json(profile);
};

const updateProfile = async (req, res) => {
  const { userId } = req.user;

  const { name, phoneNumber, education, career, address } = req.body;

  const profile = await User.findByIdAndUpdate(
    { _id: userId },
    { name, phoneNumber, education, career, address },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");
  if (!profile) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  res.status(StatusCodes.OK).json(profile);
};

const deleteProfile = async (req, res) => {
  const { userId } = req.user;

  const profile = await User.findByIdAndRemove({
    _id: userId,
  });
  if (!profile) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
