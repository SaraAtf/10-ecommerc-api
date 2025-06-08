const { Unauthorized } = require("../errors");

const checkPermissions = (requestedUser, resourceUser) => {
	if (requestedUser.role == "admin") return;
	if (requestedUser.userId == resourceUser.toString()) return;
	throw new Unauthorized(`Not Authorized to access this route`);
};

module.exports = checkPermissions;
