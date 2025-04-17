import pool from "../../config/db.js";

const deletePatient = async(req,res)=>{
  const {id} = req.body;
  try {
    const deleted = await pool.query("DELETE FROM APPLICANT WHERE id=$1",[id]);
    if(deleted.rowCount > 0){
      return res.status(201).json({msg:"Data Removed",success:true});
    }
  } catch (error) {
    return res.status(501).json({error});
  }
}

export default deletePatient;