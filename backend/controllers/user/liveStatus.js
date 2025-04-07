import pool from "../../config/db.js";

const liveStatus = async(req,res)=>{
  try {
    const {id} = req.params;
    console.log(id)
    const data = await pool.query("SELECT * from appointment WHERE userid=$1",[id]);
    console.log(data)
    if(data.rowCount == 0){
      return res.status(401).json({msg:"Not data Found",success:false});
    }

    return res.status(201).json({msg:"All appointment are here!",data:data.rows,success:true});
  } catch (error) {
    return res.status(501).json({msg:error});
  }
}

export default  liveStatus;