const ServiceCategory = require("../models/ServiceCategory");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllServiceCategories = async (req, res) => {
  const categories = await ServiceCategory.find({});
  res.status(StatusCodes.OK).json({ categories });
};

const getServiceCategory = async (req, res) => {
  const {
    params: { id: categoryId },
  } = req;

  const category = await ServiceCategory.findOne({
    _id: categoryId,
  });

  if (!category) {
    throw new NotFoundError(`No category with id ${categoryId}`);
  }
  res.status(StatusCodes.OK).json({ category });
};

const createServiceCategory = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const category = await ServiceCategory.create(req.body);
  res.status(StatusCodes.CREATED).json({ category });
};

const updateServiceCategory = async (req, res) => {
  const {
    body: { name, serviceSource },
    user: { userId },
    params: { id: categoryId },
  } = req;

  if (name === "" || serviceSource === "") {
    throw new BadRequestError("name or service Source fields cannot be empty");
  }
  const category = await ServiceCategory.findByIdAndUpdate(
    { _id: categoryId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!category) {
    throw new NotFoundError(`No category with id ${categoryId}`);
  }
  res.status(StatusCodes.OK).json({ category });
};

const deleteServiceCategory = async (req, res) => {
  const {
    params: { id: categoryId },
  } = req;

  const category = await ServiceCategory.findByIdAndRemove({ _id: categoryId });
  if (!category) {
    throw new NotFoundError(`No category with id ${categoryId}`);
  }
  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  createServiceCategory,
  deleteServiceCategory,
  getAllServiceCategories,
  updateServiceCategory,
  getServiceCategory,
};
