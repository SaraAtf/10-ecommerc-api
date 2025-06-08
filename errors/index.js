const BadRequest = require("./badRequest");
const CustomErrorAPI = require("./CustomErrorAPI");
const NotFound = require("./notFound");
const Unauthorized = require("./unauthorized");
const Unauthonticated = require("./Unuathonticated");

module.exports = {
	CustomErrorAPI,
	BadRequest,
	NotFound,
	Unauthorized,
	Unauthonticated,
};
