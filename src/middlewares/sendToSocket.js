export default (req, res, next) => {
	res.on("finish", () => {
		if (res.statusCode >= 200 && res.statusCode < 300) {
		}
	});
};
