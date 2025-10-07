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
