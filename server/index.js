import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import rmaRoutes from "./routes/rmaRoutes.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/rma", rmaRoutes);
app.use("/uploads", express.static("uploads"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static React build
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Prisijungta prie MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(
        `🚀 Serveris veikia ant http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.error("❌ MongoDB klaida:", err));
