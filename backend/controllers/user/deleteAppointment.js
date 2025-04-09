import pool from "../../config/db.js";

const deleteAppointment = async(req,res) =>{
  try {
    const {dept,id} = req.body;
    console.log(dept)
    const Found = await pool.query("SELECT id FROM appointment WHERE department=$1 and userId = $2",[dept,id]);
    console.log("Found" + JSON.stringify(Found))
    const deleted  = await pool.query("DELETE FROM appointment WHERE id=$1 RETURNING *",[Found.rows[0].id]);
    if(deleted.rowCount > 0){
      return res.status(201).json({msg:"Deleted successfully",success:true})
    }
  } catch (error) {
    return res.status(401).json({msg:error,success:true})
  }
}

export default deleteAppointment;