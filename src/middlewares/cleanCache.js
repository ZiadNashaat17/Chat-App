import { clearHash } from "../services/redisCache.js";
import logger from "../util/logger.js";

export default (req, res, next) => {
	res.on("finish", () => {
		if (res.statusCode >= 200 && res.statusCode < 300) {
			logger.info("cleaning hash: ", req.user._id);
			clearHash(req.user._id);
		}
	});

	next();
};
