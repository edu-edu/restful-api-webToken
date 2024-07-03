const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require("../controllers/contactController");
const validateToken = require("../middlewares/validateTokenHandler");

router.use(validateToken);
router.route("/")
    .post(createContact)
    .get(getContacts);

router.route("/:id")
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact);

module.exports = router;