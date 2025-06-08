const authonticateUser = require("../middleware/authentication");
const {
	getAllUser,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
} = require("../controller/userController");

const express = require("express");
const router = express.Router();

router.route("/").get(authonticateUser, getAllUser);
router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);
router.route("/:id").get(authonticateUser, getSingleUser);

module.exports = router;
