const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getProfile = async (req, res) => {
  const { userId } = req.user;
  const profile = await User.findById(userId);
  if (!profile) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  res.status(StatusCodes.OK).json({ profile });
};

const updateProfile = async (req, res) => {
  const { userId } = req.user;

  const { name, phoneNumber, education, career } = req.body;

  const profile = await User.findByIdAndUpdate(
    { _id: userId },
    { name, phoneNumber, education, career },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!profile) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const updatedProfile = {
    name: profile.name,
    _id: profile.id,
    role: profile.role,
    email: profile.email,
    image: profile.image,
    phoneNumber: profile.phoneNumber,
    career: profile.career,
    education: profile.education,
  };
  res.status(StatusCodes.OK).json({ profile: updatedProfile });
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
