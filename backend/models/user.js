import pool from '../config/db.js';

const userTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(15) CHECK(role IN ('user', 'admin')) NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ User Table Created Successfully");
  } catch (err) {
    console.error("❌ Error Creating User Table:", err);
  }
};

export default userTable;
