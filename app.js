require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notfound");
const errorMW = require("./middleware/error-handler");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const { authonticateUser } = require("./middleware/authentication");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
require("express-fileupload");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("./public"));
app.use(fileUpload());
app.use(cookieParser(process.env.JWT_SECRET_KEY));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", authonticateUser, productRouter);
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
