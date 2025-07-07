import axios from "axios";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// POST: /api/chatty
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: process.env.GROQ_MODEL, // Replaced hardcoded model
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`, // Correct ENV var name
        },
      }
    );

    const reply = response.data.choices[0].message.content.trim();
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Groq API error:", error.response?.data || error.message);
    res.status(500).json({
      error:
        error.response?.data?.error?.message ||
        "Something went wrong with Groq.",
    });
  }
});

export default router;
