import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// basic configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// CORS configurations
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173"]; // fallback for local

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      // Allow localhost and vercel
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS BLOCKED:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

// import the routes
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World! Server is runing...");
});

export default app;
