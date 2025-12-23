import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { promisify } from "util";
import User from "../models/userModel.js";
import AppError from "../util/appError.js";
import logger from "../util/logger.js";

let io;

export const initSocket = httpServer => {
	io = new Server(httpServer, { cors: { origin: "*", methods: ["GET", "POST"] } });

	io.use(async (socket, next) => {
		try {
			const token = socket.handshake.auth?.token;

			if (!token) return next();

			const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
			const user = await User.findById(decoded.id);

			if (!user) return next(new AppError("Authentication error"), 401);

			socket.userId = user._id.toString();

			return next();
		} catch (error) {
			return next(new AppError(error.message, error.status));
		}
	});

	io.on("Connection", socket => {
		if (socket.userId) {
			console.log(`User ${socket.userId} connected (socket ${socket.id})`);
		} else {
			console.log(`Unauthenticated socket connected: ${socket.id}`);
		}

		console.log("Total connected clients:", io.engine.clientsCount);

		socket.on("disconnect", _reason => {
			if (socket.userId) {
				console.log(`User ${socket.userId} disconnected`);
			} else {
				console.log("Client disconnected:", socket.id);
			}

			console.log("Total connected clients:", io.engine.clientsCount);
		});

		socket.on("error", error => {
			console.error("Socket error:", socket.id, error);
		});
	});

	console.log("Socket.IO server initialized");
};

export const getIO = () => {
	if (!io) {
		throw new Error("Socket.io not initialized!");
	}
	return io;
};
