const Municipality = require("../models/Municipality");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

const getMunicipalities = async (req, res) => {
  const municipality = await Municipality.find({});
  if (!municipality) {
    throw new BadRequestError("can not get municipalities");
  }
  res.status(StatusCodes.OK).json({ municipality });
};

const getMunicipality = async (req, res) => {
  const { municipalityId } = req.params;
  const municipality = await Municipality.find({ _id: municipalityId });
  if (!municipality) {
    throw new NotFoundError(`No municipality with id ${municipalityId}`);
  }
  res.status(StatusCodes.OK).json({ municipality });
};

const createMunicipality = async (req, res) => {
  const municipality = await Municipality.create(req.body);
  res.status(StatusCodes.CREATED).json({ municipality });
};

const updateMunicipality = async (req, res) => {
  const { id: municipalityId } = req.params;
  const {
    vision,
    president,
    members,
    phoneNumber,
    startDate,
    endDate,
    electionProgram,
  } = req.body;

  if (req.body.isCurrentMunicipality === true) {
    await Municipality.updateMany({ isCurrentMunicipality: false });
    await Municipality.findByIdAndUpdate(municipalityId, {
      isCurrentMunicipality: true,
    });
  }

  const municipality = await Municipality.findByIdAndUpdate(
    { _id: municipalityId },
    {
      vision,
      president,
      members,
      phoneNumber,
      startDate,
      endDate,
      electionProgram,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!municipality) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  res.status(StatusCodes.OK).json({ municipality });
};

module.exports = {
  getMunicipality,
  updateMunicipality,
  getMunicipalities,
  createMunicipality,
};
