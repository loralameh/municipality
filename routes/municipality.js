const express = require("express");
const authenticateUser = require("../middleware/authentication");
const authenticateadmin = require("../middleware/adminAuthentication");

const router = express.Router();
const {
  getMunicipality,
  updateMunicipality,
  getMunicipalities,
  createMunicipality,
} = require("../controllers/municipalityController");

router.route("/").get(getMunicipalities);

router.route("/").post(authenticateUser, authenticateadmin, createMunicipality);

router
  .route("/:id")
  .get(getMunicipality)
  .patch(authenticateUser, authenticateadmin, updateMunicipality);

module.exports = router;
