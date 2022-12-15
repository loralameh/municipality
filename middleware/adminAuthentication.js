const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check if user is admin
  if (req.user.role != "admin") {
    throw new UnauthenticatedError("Authentication invalid, admins only");
  }

  try {
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid, admins only");
  }
};

module.exports = auth;
