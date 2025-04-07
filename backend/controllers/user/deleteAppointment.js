import pool from "../../config/db";

const deleteAppointment = async(req,res) =>{
  try {
    const name = await req.body;
  
    const Found = await pool.query("SELECT id FROM APPOINTMENT WHERE organisation=$1",[name]);
    
    const deleted  = await pool.query("DROP FROM APPOINTMENT WHERE id=$1 RETURNING *",[Found.rows[0].id]);
    if(deleted.rowCount > 0){
      return res.status(201).json({msg:"Deleted successfully",success:true})
    }
  } catch (error) {
    return res.status(401).json({msg:error,success:true})
  }
}

export default deleteAppointment;