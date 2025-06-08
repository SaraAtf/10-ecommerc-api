const BadRequest = require("./badRequest");
const CustomErrorAPI = require("./CustomErrorAPI");
const NotFound = require("./notFound");
const Unauthonticated = require("./Unuathonticated");
const Unauthorized = require("./Unauthorized");

module.exports = {
	CustomErrorAPI,
	BadRequest,
	NotFound,
	Unauthonticated,
	Unauthorized,
};
