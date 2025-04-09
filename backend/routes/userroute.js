import express from "express";
import register from "../controllers/user/register.js";
import login from "../controllers/user/login.js";
import Appointment from "../controllers/user/appointment.js";
import liveStatus from "../controllers/user/liveStatus.js";
import deleteAppointment from "../controllers/user/deleteAppointment.js";
 // Ensure the file extension

const router = express.Router();

// Route to generate an admin key
router.post("/register",register);
// for login
router.post("/login",login);
// for taking appointment
router.post("/appointment",Appointment);
// for checking live update of queue
router.get('/livestatus/:id',liveStatus);
// for deleting appointment
router.delete('/deleteAppointment',deleteAppointment)

export default router;
