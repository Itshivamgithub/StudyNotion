const cloudinary = require("cloudinary").v2; 

exports.cloudinaryConnect = () => {
	try {
		if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
			console.error("CRITICAL: Cloudinary configuration is missing from environment variables.");
			console.log("CLOUD_NAME present:", !!process.env.CLOUD_NAME);
			console.log("API_KEY present:", !!process.env.API_KEY);
			console.log("API_SECRET present:", !!process.env.API_SECRET);
		}
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
		console.log("Cloudinary Connected Successfully");
	} catch (error) {
		console.error("Cloudinary Connection Error:", error);
	}
};
