const express = require("express");
const router = express.Router();
const {
  deleteProfile,
  getProfile,
  updateProfile,
} = require("../controllers/userProfileControllers");

router.route("/").get(getProfile).delete(deleteProfile).patch(updateProfile);

module.exports = router;
