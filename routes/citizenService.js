const express = require("express");
const authenticateUser = require("../middleware/authentication");
const authenticateadmin = require("../middleware/adminAuthentication");

const router = express.Router();
const {
  createCitizenService,
  deleteCitizenService,
  getAllCitizenServices,
  updateCitizenService,
  getCitizenService,
  getAllUserCitizenServices,
  publishCitizenService,
  unpublishCitizenService,
} = require("../controllers/citizenServiceController");

router
  .route("/")
  .post(authenticateUser, createCitizenService)
  .get(authenticateUser, getAllUserCitizenServices);

router.route("/all").get(getAllCitizenServices);

router
  .route("/:id")
  .get(authenticateUser, getCitizenService)
  .delete(authenticateUser, deleteCitizenService)
  .patch(authenticateUser, updateCitizenService);

router
  .route("/:id/publish")
  .patch(authenticateUser, authenticateadmin, publishCitizenService);

router
  .route("/:id/unpublish")
  .patch(authenticateUser, authenticateadmin, unpublishCitizenService);

module.exports = router;
