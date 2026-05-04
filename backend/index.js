import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// connection database
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.log("DB connection error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", authRouter);

if (process.env.NODE_ENV === "development") {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

export default app;
