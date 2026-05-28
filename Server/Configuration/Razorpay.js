const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();

if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
	console.warn("RAZORPAY_KEY or RAZORPAY_SECRET is missing from environment variables.");
}

exports.instance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY || "placeholder_key",
	key_secret: process.env.RAZORPAY_SECRET || "placeholder_secret",
});
