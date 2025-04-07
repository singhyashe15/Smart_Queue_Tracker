import pool from "../../config/db.js";

const liveStatus = async(req,res)=>{
  try {
    const {id} = req.params;
    const data = await pool.query("SELECT * from appointment WHERE userid=$1",[id]);
    if(data.rowCount == 0){
      return res.status(401).json({msg:"Not data Found",success:false});
    }

    return res.status(201).json({msg:"All appointment are here!",data,success:true});
  } catch (error) {
    return res.status(501).json("msg:Internal Server Error" + error);
  }
}

export default  liveStatus;