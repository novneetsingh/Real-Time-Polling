import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { prisma } from "./config/prisma.js";
import http from "http";
import { initSocket } from "./socket.js";
import userRouter from "./routes/user.route.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = initSocket(server);

// Add Socket.io to request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
(async () => {
  try {
    await prisma.$connect();
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
})();

// Routes
app.get("/", (req, res) => {
  res.send("Hello! This is the Real Time Polling Backend.");
});

// API routes
app.use("/users", userRouter);

// Start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(
    `Real Time Polling Backend is listening at http://localhost:${port}`
  );
});
