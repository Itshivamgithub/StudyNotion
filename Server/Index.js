const express = require("express");
const app = express();
const userRoutes = require("./Route/User");
const profileRoutes = require("./Route/Profile");
const courseRoutes = require("./Route/Course");
const paymentRoutes = require("./Route/Payment");
const contactUsRoute = require("./Route/Contact");
const database = require("./Configuration/Database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./Configuration/Cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

dotenv.config();

const PORT = process.env.PORT || 4000;

// Connect to database
database.connect();

// 1. CORS - MUST BE FIRST
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Request Origin:", origin);
      const allowedOrigins = [
        "http://localhost:3000",
        "https://study-notion-nu-green.vercel.app",
        "https://studynotion-edtech-project.vercel.app"
      ];
      if (process.env.FRONTEND_URL) {
        allowedOrigins.push(...process.env.FRONTEND_URL.split(","));
      }
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("CORS Blocked for Origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// 2. Other Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
}));
app.use(compression());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp",
	})
);


cloudinaryConnect();


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);


app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Welcome To StudyNotion",
	});
});

// Global Error Handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({
		success: false,
		message: process.env.NODE_ENV === "production" 
			? "Internal Server Error" 
			: err.message,
	});
});


app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});


