import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function chatWithBot(req, res) {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const botReply = completion.choices[0].message.content;
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error("Chatty Error:", error.message);
    res.status(500).json({ error: "Chatbot failed to respond" });
  }
}
