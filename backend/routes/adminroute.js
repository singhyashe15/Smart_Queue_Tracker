import express from "express";
import generateKey from "../controllers/admin/generateKey.js"; // Ensure the file extension
import fetchKey from "../controllers/admin/fetchKey.js";
import viewApplicant from "../controllers/admin/viewApplicant.js";

const router = express.Router();

// Route to generate an admin key
router.post("/adminKey", generateKey);

// for verifying Key
router.post("/fetchKey",fetchKey);

// for handling applicant
router.get("/viewApplicant/:organisation/:department",viewApplicant);

export default router;
