import pino from "pino";

const __dirname = import.meta.dirname;

const logger = pino({
	level: "info",
	transport: {
		target: "pino-pretty",
		options: {
			colorize: true,
			// destination: `${__dirname}/app.log`,
		},
	},
	timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
