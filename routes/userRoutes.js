const {
	authonticateUser,
	authorizeUser,
} = require("../middleware/authentication");
const {
	getAllUser,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
} = require("../controller/userController");

const express = require("express");
const router = express.Router();

router
	.route("/")
	.get(authonticateUser, authorizeUser("admin", "owner"), getAllUser);
router.route("/showMe").get(authonticateUser, showCurrentUser);
router.route("/updateUser").patch(authonticateUser, updateUser);
router.route("/updateUserPassword").patch(authonticateUser, updateUserPassword);
router.route("/:id").get(authonticateUser, getSingleUser);

module.exports = router;
