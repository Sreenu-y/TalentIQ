import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../backend/.env") });

import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

const app = express();

const _dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

app.use(clerkMiddleware()); //this adds auth field to request obj: req.auth()

// Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "Success from API" });
});

app.get("/success", (req, res) => {
  res.status(200).json({ msg: "Talent-IQ API is running" });
});

// Serve frontend static files
app.use(express.static(path.join(_dirname, "/frontend/dist")));

// Fallback route for SPA
app.use((req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
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
