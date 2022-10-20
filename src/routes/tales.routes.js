import { Router } from "express";
import { createTales, deleteTales, getTaleById, getTales, updateTales } from "../controllers/tales.js";
import { storage } from "../multer.js";
import multer from "multer";
const uploader = multer({ storage })
const router = Router();


// GET
router.get("/tales", getTales);
// GET
router.get("/tales/:id", getTaleById);
// POST
router.post("/tales", uploader.single("img_url"), createTales);
// PATCH
router.patch("/tales/:id", uploader.single("img_url"), updateTales);
// DELETE
router.delete("/tales/:id", deleteTales);

export default router;