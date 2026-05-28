const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
	if (!MONGODB_URL) {
		console.error("MONGODB_URL is not defined in the environment variables.");
		return;
	}
	mongoose
		.connect(MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("###############################");
			console.log("###  DB Connection Success  ###");
			console.log("###############################");
		})
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
