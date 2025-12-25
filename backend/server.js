import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ msg: "success from api" });
});

app.listen(3000, () => console.log("server is running on port 3000"));
