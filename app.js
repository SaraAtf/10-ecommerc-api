require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notfound");
const errorMW = require("./middleware/error-handler");
const authMW = require("./middleware/auth");
const morgan = require("morgan");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(authMW);
app.get("/api/v1", (req, res) => {
	return res.status(200).json({ msg: "E-commerce Dashboard" });
});

//notFound & Error Middlewares
app.use(notFound);
app.use(errorMW);
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		console.log("Connected To DB");
		app.listen(PORT, () => {
			console.log(`app is listening at port ${PORT}`);
		});
	} catch (error) {}
};

start();
