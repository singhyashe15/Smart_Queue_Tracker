import pool from "../../config/db.js";
import sendEmail from "../../helpers/sendAppointment.js";

const Appointment = async (req, res) => {
  const time = "08:00"; // Given time
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();
  try {
    const patient = req.body;
    if(patient.date < date){
      return res.status(401).json({msg:"Date cannot be less than current date"})
    }

    // Check if the email is registered
    const Found = await pool.query("SELECT * FROM users WHERE email=$1", [patient.email]);

    if (Found.rowCount > 0) {
      // Count the total number of appointments in the same department
      const Count = await pool.query(
        "SELECT COUNT(*) AS total_p FROM appointment WHERE department = $1 and organisation = $2",
        [patient.department,patient.organisation]
      );

      // Calculate the appointment time
      const people_time = totalPatients * 10; // Assuming each consultation takes 10 minutes
      date.setHours(hours, minutes + people_time);

      const newTime = date.toTimeString().slice(0, 5);
      console.log("New Appointment Time:", newTime);
      // Insert the appointment and return the inserted ID
      const booked = await pool.query(
        "INSERT INTO appointment (organisation, department, name, email, date,appointment_time, pinCode,userId) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING id",
        [patient.organisation, patient.department, patient.name, patient.email, patient.date,newTime, patient.postalCode,Found.rows[0].id]
      );
      const totalPatients = Count.rows[0].total_p || 0; // Fixing the count retrieval
      const insertedId = booked.rows[0].id; // Fetch inserted appointment ID

      // Send confirmation email
      const emailResponse = await sendEmail(patient.name, patient.email,patient.department,patient.organisation, insertedId, patient.date, newTime);
      console.log("Email Response:", emailResponse);

      return res.status(201).json({ msg: "Your Appointment was Successfully Booked", success: true });
    }

    return res.status(401).json({ msg: "Provide Registered Email HERE" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

export default Appointment;

