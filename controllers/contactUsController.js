const Contact = require("../models/Contact");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

//only for admins
const getAllContactUsMesgsAdmin = async (req, res) => {
  const contactUsMesgs = await Contact.find({});
  res.status(StatusCodes.OK).json({ contactUsMesgs });
};

//protected rout user's contactUsMesgs
const getAllContactUsMesgs = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const contactUsMesgs = await Contact.find({
    citizen: userId,
  });
  res.status(StatusCodes.OK).json({ contactUsMesgs });
};

const getContactUsMesg = async (req, res) => {
  const {
    params: { id: contactUsMesgId },
    // user: { userId },
  } = req;
  const { userId } = req.user;
  console.log({ userId });
  const contactUsMesg = await Contact.findOne({
    _id: contactUsMesgId,
    citizen: userId,
  });
  if (!contactUsMesg) {
    throw new NotFoundError(`No contactUsMesg with id ${contactUsMesgId}`);
  }
  res.status(StatusCodes.OK).json({ contactUsMesg });
};

const createContactUsMesg = async (req, res) => {
  req.body.citizen = req.user.userId;
  const contactUsMesg = await Contact.create(req.body);
  res.status(StatusCodes.CREATED).json({ contactUsMesg });
};

//this update is actually when admin replies to this messages and not really update to the message content
const updateContactUsMesg = async (req, res) => {
  const {
    params: { id: contactUsMesgId },
  } = req;
  const { answer, municipalityMember } = req.body;
  const contactUsMesg = await Contact.findByIdAndUpdate(
    { _id: contactUsMesgId },
    { answer, municipalityMember },
    { new: true, runValidators: true }
  );
  if (!contactUsMesg) {
    throw new NotFoundError(`No contactUsMesg with id ${contactUsMesgId}`);
  }
  res.status(StatusCodes.OK).json({ contactUsMesg });
};

const deleteContactUsMesg = async (req, res) => {
  const {
    params: { id: contactUsMesgId },
  } = req;

  const contactUsMesg = await Contact.findByIdAndRemove({
    _id: contactUsMesgId,
  });
  if (!contactUsMesg) {
    throw new NotFoundError(`No contactUsMesg with id ${contactUsMesgId}`);
  }
  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  getAllContactUsMesgsAdmin,
  getAllContactUsMesgs,
  getContactUsMesg,
  createContactUsMesg,
  updateContactUsMesg,
  deleteContactUsMesg,
};
