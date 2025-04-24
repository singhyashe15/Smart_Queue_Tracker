import { customReplies } from "../../data/data.js";

const chat = async (req, res) => {
  console.log(req.body)
  const { prompt } = req.body;
  
  try {
    if (!prompt) {
      return res.status(403).json({ reply: "Fill the query first" })
    }

    for (let { pattern, reply } of customReplies) {
      if (pattern.test(prompt)) {
        return res.status(200).json({ reply });
      }
    }

    const reply = "Sorry, I didn't get this.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export default chat
