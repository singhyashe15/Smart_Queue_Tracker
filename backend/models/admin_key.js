import pool from '../config/db.js';

const Admin_key = async()=> {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_key (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        organisation VARCHAR(50) NOT NULL,
        department VARCHAR(50) NOT NULL,
        key varchar(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Table created successfully");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
}


export default  Admin_key;