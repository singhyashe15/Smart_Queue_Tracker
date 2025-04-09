import pool from "../../config/db.js";

const viewApplicant = async(req,res)=>{
  const {organisation,department} = req.params;
  console.log(department)
  try {
    const data = await pool.query("SELECT * FROM appointment WHERE organisation = $1 AND department = $2",[organisation,department]);
    if(data.rowCount > 0){
      return res.status(201).json({msg:"Fetched Data Successfully",data:data.rows,success:true});
    }
    return res.status(402).json({msg:"No data Found",success:true});
  } catch (error) {
    return res.status(501).json({msg:error,success:false});
  }
}

export default viewApplicant;