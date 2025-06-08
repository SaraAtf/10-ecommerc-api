require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notfound");
const errorMW = require("./middleware/error-handler");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET_KEY));

app.get("/api/v1/products", (req, res) => {
	return res.status(200).json({ msg: "Products" });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
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
