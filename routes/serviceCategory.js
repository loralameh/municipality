const express = require("express");
const authenticateadmin = require("../middleware/adminAuthentication");
const authenticateUser = require("../middleware/authentication");

const router = express.Router();
const {
  createServiceCategory,
  deleteServiceCategory,
  getAllServiceCategories,
  updateServiceCategory,
  getServiceCategory,
} = require("../controllers/serviceCategoryController");

//only admins can post/patch /delete
router
  .route("/")
  .post(authenticateUser, authenticateadmin, createServiceCategory)
  .get(getAllServiceCategories);

router
  .route("/:id")
  .get(getServiceCategory)
  .delete(authenticateUser, authenticateadmin, deleteServiceCategory)
  .patch(authenticateUser, authenticateadmin, updateServiceCategory);

module.exports = router;
