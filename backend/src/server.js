import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin || // allow server-to-server requests
        origin.startsWith("http://localhost") ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(clerkMiddleware()); //this adds auth field to request obj: req.auth()

// Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Talent-IQ API is running" });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "Success from API" });
});

const startServer = async () => {
  try {
    if (!ENV.DB_URL) {
      throw new Error("DB_URL environment variable is not defined");
    }

    await connectDB();
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  } catch (err) {
    console.error("Error starting server:", err.message);
  }
};

startServer();
