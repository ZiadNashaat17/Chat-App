import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

config({ path: "./config.env" });

import globalErrorHandler from "./middlewares/errorController.js";
import userRouter from "./routes/userRoutes.js";
import AppError from "./util/appError.js";

const app = express();

app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV.trim() === "development") {
	app.use(morgan("dev"));
}

app.use("/api/user", userRouter);

app.use((req, _res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
