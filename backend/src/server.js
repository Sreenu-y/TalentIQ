import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest";
import { inngest } from "./lib/inngest.js";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { fileURLToPath } from "url";

const app = express();

// Needed for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

// Connect DB ONCE per cold start
await connectDB();

// Inngest endpoint
app.use("/api/inngest", serve({ client: inngest }));

// API routes
app.get("/success", (req, res) => {
  res.status(200).json({ msg: "success from api" });
});

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "books api" });
});

// Serve frontend (Vite build)
if (ENV.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../dist");

  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Export the app
export default app;
