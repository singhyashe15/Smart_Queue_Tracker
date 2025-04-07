import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import userRouter from './routes/userroute.js';
import adminRouter from "./routes/adminroute.js";
import pool from './config/db.js'
import Admin_key from "./models/admin_key.js";
import user from "./models/user.js";
import appointment from "./models/appointment.js";
const app = express();
dotenv.config()

const PORT = process.env.PORT || 3000;
console.log(process.env.Fronted_Url)
app.use(cors({
  origin: process.env.Fronted_Url,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.text()); // This handles plain text requests
app.use("/userapi", userRouter);
app.use("/adminapi", adminRouter);

// database Connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Database Connection Error:", err));

// Table Connnection
Admin_key();
user()
appointment();

app.listen(PORT, () => {
  console.log("Connected to the port");
})
