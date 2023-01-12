const CitizenService = require("../models/CitizenService");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

//non-protected rout for all published services by all users
const getAllCitizenServices = async (req, res) => {
  const filter = req.query.category ? { category: req.query.category } : {};

  const services = await CitizenService.find({
    ...filter,
    isPublished: true,
  }).populate(["createdBy"]);
  res.status(StatusCodes.OK).json(services);
};

//protected rout all services for a specific user
const getAllUserCitizenServices = async (req, res) => {
  const services = await CitizenService.find({
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.OK).json(services);
};

const getCitizenService = async (req, res) => {
  const {
    // user: { userId },
    params: { id: serviceId },
  } = req;

  const service = await CitizenService.findOne({
    _id: serviceId,
    // createdBy: userId,
  });
  // .populate("createdBy");
  if (!service) {
    throw new NotFoundError(`No service with id ${serviceId}`);
  }
  res.status(StatusCodes.OK).json(service);
};

const createCitizenService = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const service = await CitizenService.create(req.body);
  res.status(StatusCodes.CREATED).json(service);
};

const updateCitizenService = async (req, res) => {
  const {
    user: { userId },
    params: { id: serviceId },
  } = req;

  const service = await CitizenService.findByIdAndUpdate(
    { _id: serviceId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!service) {
    throw new NotFoundError(`No service with id ${serviceId}`);
  }
  res.status(StatusCodes.OK).json(service);
};

const deleteCitizenService = async (req, res) => {
  const {
    user: { userId },
    params: { id: serviceId },
  } = req;

  const service = await CitizenService.findByIdAndRemove({
    _id: serviceId,
    createdBy: userId,
  });
  if (!service) {
    throw new NotFoundError(`No service with id ${serviceId}`);
  }
  res.status(StatusCodes.OK).json({ success: true });
};

//only admins
const publishCitizenService = async (req, res) => {
  const {
    params: { id: serviceId },
  } = req;
  const service = await CitizenService.findByIdAndUpdate(
    { _id: serviceId },
    { isPublished: true },
    { new: true, runValidators: true }
  );
  if (!service) {
    throw new NotFoundError(`No service with id ${serviceId}`);
  }
  res.status(StatusCodes.OK).json(service);
};

//only admins
const unpublishCitizenService = async (req, res) => {
  const {
    params: { id: serviceId },
  } = req;
  const service = await CitizenService.findByIdAndUpdate(
    { _id: serviceId },
    { isPublished: false },
    { new: true, runValidators: true }
  );
  if (!service) {
    throw new NotFoundError(`No service with id ${serviceId}`);
  }
  res.status(StatusCodes.OK).json(service);
};

module.exports = {
  createCitizenService,
  deleteCitizenService,
  getAllCitizenServices,
  updateCitizenService,
  getCitizenService,
  getAllUserCitizenServices,
  publishCitizenService,
  unpublishCitizenService,
};
