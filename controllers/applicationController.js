const Application = require("../models/Application");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

//only for admins
const getAllApplicationsAdmin = async (req, res) => {
  const applications = await Application.find({});
  res.status(StatusCodes.OK).json({ applications });
};

//protected rout user's applications
const getAllApplications = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const applications = await Application.find({
    applicant: userId,
  });
  res.status(StatusCodes.OK).json({ applications });
};

const getApplication = async (req, res) => {
  const {
    params: { id: applicationId },
    // user: { userId },
  } = req;
  const { userId } = req.user;
  console.log({ userId });
  const application = await Application.findOne({
    _id: applicationId,
    applicant: userId,
  });
  if (!application) {
    throw new NotFoundError(`No application with id ${applicationId}`);
  }
  res.status(StatusCodes.OK).json({ application });
};

const createApplication = async (req, res) => {
  req.body.applicant = req.user.userId;
  const application = await Application.create(req.body);
  res.status(StatusCodes.CREATED).json({ application });
};

const updateApplication = async (req, res) => {
  const {
    params: { id: applicationId },
  } = req;

  const application = await Application.findByIdAndUpdate(
    { _id: applicationId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!application) {
    throw new NotFoundError(`No application with id ${applicationId}`);
  }
  res.status(StatusCodes.OK).json({ application });
};

const deleteApplication = async (req, res) => {
  const {
    params: { id: applicationId },
  } = req;

  const application = await Application.findByIdAndRemove({
    _id: applicationId,
  });
  if (!application) {
    throw new NotFoundError(`No application with id ${applicationId}`);
  }
  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  getAllApplicationsAdmin,
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
};
