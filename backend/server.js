

import express from "express";
import multer from "multer";
import OpenAI from "openai";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/analyze", upload.array("photos"), async (req, res) => {
  const { discipline, stage } = req.body;

  const images = await Promise.all(
    req.files.map(async (file, index) => {
      const base64 = fs.readFileSync(file.path, "base64");

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: `You are an AI-assisted Field Review Assistant.
Do not determine compliance. Observational language only.`
          },
          {
            role: "user",
            content: [
              { type: "text", text: `Discipline: ${discipline}\nStage: ${stage}` },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64}` } }
            ]
          }
        ]
      });

      return {
        image_id: index,
        ...JSON.parse(response.choices[0].message.content)
      };
    })
  );

  res.json({ images });
});

app.listen(3000, () => console.log("Backend running on port 3000"));
