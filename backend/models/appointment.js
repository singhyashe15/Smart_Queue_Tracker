import pool from '../config/db.js';

const appointment = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointment (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        organisation VARCHAR(100) NOT NULL,
        department VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        pinCode INT NULL,
        userid INT references users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Appointment Table Created Successfully");
  } catch (err) {
    console.error("❌ Error Creating User Table:", err);
  }
  
};

export default appointment;
