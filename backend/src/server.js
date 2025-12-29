import express from "express";
import path from "path";
import dotenv from "dotenv";
import { ENV } from "./lib/env.js";

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.get("/success", (req, res) => {
  res.status(200).json({ msg: "success from api" });
});

//make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/{*any}", (req, res) =>
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  );
}

const PORT = ENV.PORT;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
