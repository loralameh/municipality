const express = require("express");
const authenticateUser = require("../middleware/authentication");
const authenticateadmin = require("../middleware/adminAuthentication");

const router = express.Router();
const {
  createElectricityBill,
  deleteElectricityBill,
  getAllElectricityBills,
  updateElectricityBill,
  getElectricityBill,
} = require("../controllers/electricityBillController");

router
  .route("/")
  .post(authenticateadmin, createElectricityBill)
  .get(getAllElectricityBills);

router
  .route("/:id")
  .get(getElectricityBill)
  .delete(authenticateadmin, deleteElectricityBill)
  .patch(authenticateadmin, updateElectricityBill);

module.exports = router;
