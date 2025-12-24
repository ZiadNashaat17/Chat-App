import { createServer } from "node:http";
import { connect } from "mongoose";
import app from "./app.js";
import { initSocket } from "./services/socket.js";
import logger from "./util/logger.js";

const port = process.env.PORT || 8000;
const DB = process.env.DATABASE;
const httpServer = createServer(app);

(async () => {
	try {
		await connect(DB);
		logger.info("Connected to DB successfully!");

		initSocket(httpServer);

		httpServer.listen(port, () => {
			logger.info(`Server is running on port: ${port}`);
		});
	} catch (error) {
		logger.info("Server startup error: ", error);
		process.exit(1);
	}
})();
