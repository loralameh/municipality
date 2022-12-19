const express = require("express");
const authenticateadmin = require("../middleware/adminAuthentication");
const authenticateUser = require("../middleware/authentication");

const router = express.Router();
const {
  getAllContactUsMesgsAdmin,
  getAllContactUsMesgs,
  getContactUsMesg,
  createContactUsMesg,
  updateContactUsMesg,
  deleteContactUsMesg,
} = require("../controllers/contactUsController");

router.route("/admin").get(authenticateadmin, getAllContactUsMesgsAdmin);
router.route("/admin/:id").patch(authenticateadmin, updateContactUsMesg);

router.route("/").post(createContactUsMesg).get(getAllContactUsMesgs);

router.route("/:id").get(getContactUsMesg).delete(deleteContactUsMesg);

module.exports = router;
