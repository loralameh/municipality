const express = require("express");
const authenticateadmin = require("../middleware/adminAuthentication");
const authenticateUser = require("../middleware/authentication");

const router = express.Router();
const {
  getAllApplicationsAdmin,
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../controllers/applicationController");

//only admins can post/patch /delete
router.route("/admin").get(authenticateadmin, getAllApplicationsAdmin);

router.route("/").post(createApplication).get(getAllApplications);

router
  .route("/:id")
  .get(getApplication)
  .delete(deleteApplication)
  .patch(updateApplication);

module.exports = router;
