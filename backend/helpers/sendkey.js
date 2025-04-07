import { createTransport } from "nodemailer";
import dotenv from "dotenv"
dotenv.config();
const Transporter = createTransport({
  service:'gmail',
    auth:{
        user: process.env.EMAIL_USER, //email address
        pass: process.env.EMAIL_PASS// password
    },
    port: 587, 
    secure: false,
    tls: {
    rejectUnauthorized: false, // Helps prevent SSL issues
  },
})
const  sendEmail = async(email,code) => {
  try {
      const info = Transporter.sendMail({
          from: process.env.EMAIL_USER, // sender address
          to: email, // list of receivers
          subject: "Activate Your Admin Account", 
          html: `<h2>Welcome to Smart Queue</h2> </br>
                 <p> Your private Key: ${code} </p>
                 <p>Register with this key from now!!</p>`
      });
      return {info,success:true}
  } catch (error) {
    return {error,success:false}
  }
 
}
export default sendEmail;
