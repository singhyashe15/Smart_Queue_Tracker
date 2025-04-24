import pool from "../../config/db.js"

const TotalAppointment =async (req,res) =>{
  const {id} = req.params
  try {
    const Count = await pool.query("SELECT COUNT(*) FROM APPOINTMENT WHERE userId=$1",[id]);
    return res.status(201).json({Count:Count.rowCount})
  } catch (error) {
    return res.status(501).json(error)
  }
}

export default TotalAppointment
