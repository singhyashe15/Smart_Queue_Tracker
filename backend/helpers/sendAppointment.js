import { createTransport } from "nodemailer";
import QRCode from "qrcode"
import dotenv from "dotenv"
import fs from "fs"
dotenv.config();

const Transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, //email address
    pass: process.env.EMAIL_PASS// password
  },
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false, // Helps prevent SSL issues
  },
})
const sendEmail = async (name, email,department,organisation, c_id, date, time) => {
  const qrCodeData = `${email}`;
  console.log(qrCodeData)
  const qrCodeImage = await QRCode.toDataURL(qrCodeData); // Convert to base64
  console.log(qrCodeImage)
  const base64Data = qrCodeImage.replace(/^data:image\/png;base64,/, "");
  const filePath = "qrcode.png";
  fs.writeFileSync(filePath, base64Data, "base64");
  try {
    const info = Transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: email, // list of receivers
      subject: "Appointment Confirmation",
      html: `<h2>Welcome to Smart Queue</h2> </br>
                <p>Hello ${name},your Appointment is Confirmed for${department} at${organisation}</p>
                <p>Your Coupon id is ${c_id}</p>
                <p>Reach Out on ${date} at ${time}</p>
                 <img src="cid:qrcodecid" alt="QR Code" style="width:200px;height:200px;">
                `,
      attachments: [
        {
          filename: "qrcode.png",
          path: filePath,
          cid: "qrcodecid", // Content-ID for embedding
        },
      ],
    });
    console.log("INFO " + JSON.stringify(info))
    console.log(Transporter)
  } catch (error) {
    console.log(error)
  }

}
export default sendEmail;
