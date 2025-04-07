import pool from "../../config/db.js";

const  fetchKey = async(req,res)=> {
  try {
    console.log(req.body)
    const key = await req.body;
    console.log(key)
    const Found = await pool.query("SELECT * FROM admin_key WHERE key=$1",[key]);
    console.log(Found)
    if(Found.rowCount === 0){
      return res.status(401).json({message:"Can't access, Check the code",success:false})
    }
    
    let organisation = Found.rows[0].organisation;
    if(organisation === 'Hos'){
      organisation = 'Hospital'
    }else if(organisation === 'Ban'){
      organisation = 'Bank'
    }else if(organisation === 'Gov'){
      organisation = 'Government'
    }
    const department = Found.rows[0].department;
    return res.status(201).json({msg:"Verified",organisation,department,success:true})
  } catch (error) {
    return res.status(501).json("Internal server error" + error)
  }
};

export default fetchKey;