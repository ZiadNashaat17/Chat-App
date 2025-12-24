import mongoose from "mongoose";
import { createClient } from "redis";
import User from "../models/userModel.js";
import logger from "../util/logger.js";

const client = createClient({ url: process.env.REDIS_URL });
const exec = mongoose.Query.prototype.exec;

client.on("error", err => logger.info("Redis Client Error", err));
client.on("connect", () => logger.info("Redis Client Connected"));

await client.connect();

mongoose.Query.prototype.cache = function (options = {}) {
	this.useCache = true;
	this.hashKey = JSON.stringify(options.key || "");

	return this;
};

mongoose.Query.prototype.exec = async function () {
	if (!this.useCache) {
		// biome-ignore lint/complexity/noArguments: <>
		return exec.apply(this, arguments);
	}
	const key = JSON.stringify(
		Object.assign({}, this.getQuery(), {
			collection: this.mongooseCollection.name,
		}),
	);

	const cacheValue = await client.hGet(this.hashKey, key);
	if (cacheValue) {
		const doc = JSON.parse(cacheValue);

		logger.info("Serving from cache");

		// Use hydrate() to properly restore Mongoose documents with populated fields
		return Array.isArray(doc) ? doc.map(d => this.model.hydrate(d)) : this.model.hydrate(doc);
	}
	// biome-ignore lint/complexity/noArguments: <>
	const result = await exec.apply(this, arguments);

	client.hSet(this.hashKey, key, JSON.stringify(result), "EX", 300);

	return result;
};

export const clearHash = hashKey => {
	client.del(JSON.stringify(hashKey));
};

export const cacheLoggedUser = user => {
	const key = "logged-user";
	const data = JSON.stringify(user);

	client.set(key, data);
};

export const getLoggedUser = async () => {
	const key = "logged-user";
	const user = await client.get(key);

	if (!user) return null;

	return User.hydrate(JSON.parse(user));
};

export const clearLoggedUser = () => {
	const key = "logged-user";

	client.del(key);
};

export const closeRedis = async () => {
	try {
		if (client) {
			await client.quit();
			logger.info("Redis disconnected");
		}
	} catch (error) {
		console.error("Error closing Redis:", error);
		throw error;
	}
};
