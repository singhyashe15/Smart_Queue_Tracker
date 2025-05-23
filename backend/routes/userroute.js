import express from "express";
import register from "../controllers/user/register.js";
import login from "../controllers/user/login.js";
import Appointment from "../controllers/user/appointment.js";
import liveStatus from "../controllers/user/liveStatus.js";
import deleteAppointment from "../controllers/user/deleteAppointment.js";
import Chat from "../controllers/user/chat.js";
import TotalAppointment from "../controllers/user/totalAppointment.js";

const router = express.Router();

// Route to generate an admin key
router.post("/register",register);
// for login
router.post("/login",login);
// for taking appointment
router.post("/appointment",Appointment);
// for checking live update of queue
router.get('/livestatus/:orgs/:id',liveStatus);
// for deleting appointment
router.delete('/deleteAppointment',deleteAppointment)
// for chat-bot 
router.post('/chat',Chat);
// to get totalappointment of users
router.get('/totalAppointment/:id',TotalAppointment)

export default router;
