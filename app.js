import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
// import csurf from "csurf";
import cors from "cors";
import connection_DB from "./src/config/db.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import authRoutes from "./src/routes/auth.routes.js";
import courseRoutes from "./src/routes/course.routes.js";
import usersRoutes from "./src/routes/user.routes.js";

dotenv.config();
connection_DB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(cors({
  credentials: true
}));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", usersRoutes);

// Error handler
app.use(errorHandler);

export default app;