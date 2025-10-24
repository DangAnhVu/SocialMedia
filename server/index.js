import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "./middleware/auth.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url); // Get the filename of the current module
const __dirname = path.dirname(__filename); // Get the directory name of the current module
dotenv.config();

const app = express();
app.use(express.json()); // Built-in middleware for parsing JSON
app.use(helmet()); // Security middleware
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Adjusted for cross-origin requests
app.use(morgan("common")); // Logging middleware
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Body parser for JSON
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Body parser for URL-encoded data
app.use(cors()); // Enable CORS for all routes to allow cross-origin requests
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // Serve static files from the "public/assets" directory

/* FILE STORAGE */
// lưu trữ file upload sử dụng multer và lưu vào thư mục public/assets
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets"); // để lưu file vào thư mục public/assets
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // giữ nguyên tên file gốc
    },
});

const upload = multer({ storage }); // tạo instance multer với cấu hình lưu trữ, khi nào cần upload file thì dùng biến upload

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001; // Sử dụng biến PORT từ file .env, nếu không có thì mặc định là 6001
mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/socialmedia")
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`)); // Khởi động server sau khi kết nối DB thành công
        /* ADD DATA ONE TIME */
        User.insertMany(users); // Chèn dữ liệu mẫu người dùng vào DB (chạy 1 lần)
        Post.insertMany(posts); // Chèn dữ liệu mẫu bài đăng vào DB (chạy 1 lần)
    })
    .catch((error) => console.log(`${error} did not connect`)); // In lỗi nếu kết nối DB thất bại

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register); // Route đăng ký người dùng với upload file ảnh
app.post("/posts", verifyToken, upload.single("picture"), createPost); // Route tạo bài đăng với upload file ảnh và xác thực token

/* ROUTES */
app.use("/auth", authRoutes); // Sử dụng các route trong authRoutes cho đường dẫn /auth
app.use("/users", userRoutes); // Sử dụng các route trong userRoutes cho đường dẫn /users
