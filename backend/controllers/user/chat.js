import axios from "axios";

const customReplies = [
  { pattern: /how to login/i, reply: "To log in: go to the Login page at the top right , enter your email & password, then click Submit." },
  { pattern: /book.*appointment/i, reply: "Go to the booking section, choose a organisation,enter patient name,email,date,department then confirm your slot." },
  { pattern: /cancel.*appointment/i, reply: "Visit your dashboard, find the appointment, and click 'Cancel'." },
  { pattern: /how long.*wait/i, reply: "You can view your estimated wait time on the live queue dashboard" },
  { pattern: /queue status/i, reply: "Go to the 'My Queue' section to see your current position and estimated wait time." },

  // add more patterns here…
];

const chat = async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt)
  try {
    if (!prompt) {
      return res.status(402).json({ reply: "Fill the query first" })
    }
    const headers = {
      'Authorization': `Bearer ${process.env.API_KEY}`,
      'Content-Type': 'application/json'
    };

    for (let { pattern, reply } of customReplies) {
      if (pattern.test(prompt)) {
        return res.status(200).json({ reply });
      }
    }

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      {
        inputs: prompt
      },
      { headers }
    );
    console.log(response.data)
    const reply = response.data[0].generated_text || "Sorry, I didn't get that.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export default chat
