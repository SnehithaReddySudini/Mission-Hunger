const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/generate-description", async (req, res) => {
  try {
    const { keywords } = req.body;

    if (!keywords || keywords.trim() === "") {
      return res.status(400).json({
        message: "Please provide donation details.",
      });
    }

    const prompt = `
You are an assistant for a food donation platform.

Create a clear, concise donation listing description from the donor's information below.

Important rules:
- Do not invent facts.
- Only use information provided by the donor.
- Do not claim the food is safe, fresh, healthy, or suitable for consumption unless explicitly stated.
- Mention quantity, food type, age, and storage information when provided.
- Use a professional and helpful tone.
- Keep the description between 2 and 4 sentences.

Donor information:
${keywords}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const description = response.text;

    res.json({
      description,
    });
  } catch (error) {
    console.error("========== GEMINI API ERROR ==========");
    console.error(error);
    console.error("======================================");

    res.status(500).json({
      message: "Unable to generate description. Please enter it manually.",
      error: error.message,
    });
  }
});

module.exports = router;