import express from "express";
import generateKey from "../controllers/admin/generateKey.js"; // Ensure the file extension
import fetchKey from "../controllers/admin/fetchKey.js";

const router = express.Router();

// Route to generate an admin key
router.post("/adminKey", generateKey);

router.post("/fetchKey",fetchKey);

export default router;
