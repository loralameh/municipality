const express = require("express");
const authenticateUser = require("../middleware/authentication");
const authenticateadmin = require("../middleware/adminAuthentication");

const router = express.Router();
const {
  getAllMunicipalityServices,
  getMunicipalityService,
  createMunicipalityService,
  updateMunicipalityService,
  deleteMunicipalityService,
} = require("../controllers/municipalityServiceController");

router.route("/").get(getAllMunicipalityServices);

router
  .route("/")
  .post(authenticateUser, authenticateadmin, createMunicipalityService);

router
  .route("/:id")
  .get(getMunicipalityService)
  .delete(authenticateUser, authenticateadmin, deleteMunicipalityService)
  .patch(authenticateUser, authenticateadmin, updateMunicipalityService);

module.exports = router;
