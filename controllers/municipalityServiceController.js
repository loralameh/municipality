const MunicipalityService = require("../models/MunicipalityService");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

//non-protected rout for all published services by all users
const getAllMunicipalityServices = async (req, res) => {
  const services = await MunicipalityService.find({}).populate(["category"]);
  res.status(StatusCodes.OK).json(services);
};

const getMunicipalityService = async (req, res) => {
  const {
    params: { id: serviceId },
  } = req;

  const service = await MunicipalityService.findOne({
    _id: serviceId,
  });
  if (!service) {
    throw new NotFoundError(`No service with id ${serviceId}`);
  }
  res.status(StatusCodes.OK).json(service);
};

const createMunicipalityService = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const service = await MunicipalityService.create(req.body);
  res.status(StatusCodes.CREATED).json(service);
};

const updateMunicipalityService = async (req, res) => {
  const {
    params: { id: serviceId },
  } = req;

  const service = await MunicipalityService.findByIdAndUpdate(
    { _id: serviceId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!service) {
    throw new NotFoundError(`No service with id ${serviceId}`);
  }
  res.status(StatusCodes.OK).json(service);
};

const deleteMunicipalityService = async (req, res) => {
  const {
    params: { id: serviceId },
  } = req;

  const service = await MunicipalityService.findByIdAndRemove({
    _id: serviceId,
  });
  if (!service) {
    throw new NotFoundError(`No service with id ${serviceId}`);
  }
  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  getAllMunicipalityServices,
  getMunicipalityService,
  createMunicipalityService,
  updateMunicipalityService,
  deleteMunicipalityService,
};
