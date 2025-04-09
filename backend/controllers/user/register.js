import pool from "../../config/db.js";
import bcryptjs from "bcryptjs"
import sendEmail from "../../helpers/sendConfirmation.js";

const register = async(req,res)=>{
    try {
      const  user = await req.body;
      console.log(user)
      const Found = await pool.query("SELECT * FROM users WHERE email = $1",[user?.email])
      console.log(Found)
      if(Found.rows.length > 0){
        console.log("Found")
        return res.status(200).json({msg:"Email already Exist",success:false})
      }

      // hashed password
      const salt = await bcryptjs.genSalt(10);
      const hashPass = await bcryptjs.hash(user.password,salt);
      console.log(hashPass)
      
      const email = await sendEmail(user.name,user.email);
      console.log(email.success)
      if(email.success){
        const usercreated = await pool.query("INSERT INTO users (name,email,role,password) VALUES ($1,$2,$3,$4) RETURNING *",[user.name,user.email,user.role,hashPass])
        return res.status(201).json({msg:"Registered Successfully, Check Out your Email",role:user.role,id:usercreated.rows[0].id,name:usercreated.rows[0].name,success:true})
      }
        return res.status(400).json({msg:"False Email "})
    } catch (error) {
      console.log("Error "  + error)
      return res.status(501).json({error:error})
    }
}

export default register;