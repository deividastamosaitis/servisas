import express from "express";
import { upload } from "../middleware/upload.js";
import { registerRma, checkRmaStatus } from "../controllers/rmaController.js";
const router = express.Router();

router.post("/register", upload.array("files"), registerRma);
router.get("/status/:rma", checkRmaStatus);

export default router;
