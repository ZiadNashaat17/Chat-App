import { createServer } from "node:http";
import { connect } from "mongoose";
import app from "./app.js";
import { initSocket } from "./services/socket.js";

const port = process.env.PORT || 8000;
const DB = process.env.DATABASE;
const httpServer = createServer(app);

(async () => {
	try {
		await connect(DB);
		console.log("Connected to DB successfully!");

		initSocket(httpServer);

		httpServer.listen(port, () => {
			console.log(`App is running on port: ${port}`);
		});
	} catch (error) {
		console.log("App startup error: ", error);
		process.exit(1);
	}
})();
