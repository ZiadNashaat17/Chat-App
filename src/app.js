import cors from "cors";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
// import morgan from "morgan";
import PinoHttp from "pino-http";

config({ path: "./config.env" });

import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import chatRouter from "./routes/chatRoutes.js";
import messagesRouter from "./routes/messagesRoutes.js";
import userRouter from "./routes/userRoutes.js";
import AppError from "./util/appError.js";
import logger from "./util/logger.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV.trim() === "development") {
	app.use(PinoHttp({ logger }));
	// app.use(morgan("dev"));
}

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/messages", messagesRouter);

app.use((req, res, next) => {
	// Silently ignore favicon requests
	if (req.url === "/favicon.ico") {
		return res.status(204).end();
	}

	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
