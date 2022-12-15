const ElectricityBill = require("../models/ElectricityBill");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllElectricityBills = async (req, res) => {
  const bills = await ElectricityBill.find({
    reciever: req.user.userId,
  }).sort("createdAt");
  res.status(StatusCodes.OK).json({ bills });
};

const getElectricityBill = async (req, res) => {
  const {
    user: { userId },
    params: { id: billId },
  } = req;

  const bill = await ElectricityBill.findOne({
    _id: billId,
    reciever: userId,
  });
  // .populate("reciever");
  if (!bill) {
    throw new NotFoundError(`No bill with id ${billId}`);
  }
  res.status(StatusCodes.OK).json({ bill });
};

const createElectricityBill = async (req, res) => {
  req.body.reciever = req.user.userId;
  const bill = await ElectricityBill.create(req.body);
  res.status(StatusCodes.CREATED).json({ bill });
};

const updateElectricityBill = async (req, res) => {
  const {
    user: { userId },
    params: { id: billId },
  } = req;

  const bill = await ElectricityBill.findByIdAndUpdate(
    { _id: billId, reciever: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!bill) {
    throw new NotFoundError(`No bill with id ${billId}`);
  }
  res.status(StatusCodes.OK).json({ bill });
};

//only admins
const deleteElectricityBill = async (req, res) => {
  const {
    user: { userId },
    params: { id: billId },
  } = req;

  const bill = await ElectricityBill.findByIdAndRemove({
    _id: billId,
    reciever: userId,
  });
  if (!bill) {
    throw new NotFoundError(`No bill with id ${billId}`);
  }
  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  createElectricityBill,
  deleteElectricityBill,
  getAllElectricityBills,
  updateElectricityBill,
  getElectricityBill,
};
