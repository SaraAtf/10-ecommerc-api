const { StatusCodes } = require("http-status-codes");
const CustomErrorAPI = require("./CustomErrorAPI");

class Unauthonticated extends CustomErrorAPI {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

module.exports = Unauthonticated;
