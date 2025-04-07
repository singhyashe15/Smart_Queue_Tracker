import sendEmail from "../../helpers/sendkey.js";
import pool from "../../config/db.js";
import {customAlphabet} from 'nanoid'

const  generateKey = async(req,res)=> {
  try {
    const admin = await req.body;
    console.log(admin)
    const Found = await pool.query("SELECT * FROM admin_key WHERE department=$1",[admin.department]);
    console.log(Found)
    if(Found.rowCount > 0){
      return res.status(203).json({message:"Already Exist"})
    }
    const code = customAlphabet("123456789",4);
    const key = code();

    const organisation = admin.organisation.slice(0,3);
    const subdept = admin.department.split(" ")[0]
    const p_key = `${organisation}#${subdept}#${key}`;
    const email = await sendEmail(admin.email,p_key)
    console.log(email.success)
    if(email.success){
      const created = await pool.query("INSERT INTO admin_key (name,email,organisation,department,key) VALUES ($1,$2,$3,$4,$5)",[admin.name,admin.email,admin.organisation,admin.department,p_key])
      if(created){
        return res.status(201).json({msg:"Generated ",success:true});
      }
    }
    return res.status(401).json({msg:"Check Your Email",success:false})
  } catch (error) {
    return res.status(501).json("Internal server error" + error)
  }
};

export default generateKey;