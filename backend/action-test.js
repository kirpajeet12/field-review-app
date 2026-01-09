import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function toBase64(path) {
  return fs.readFileSync(path, { encoding: "base64" });
}

async function run() {
  const img = toBase64("backend/test-assets/test.jpg");

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: `
You are an AI-assisted Field Review Assistant.
- Use observational language only
- Do NOT claim code violations
- Return JSON only
        `
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Discipline: Electrical\nStage: Rough-In"
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${img}`
            }
          }
        ]
      }
    ]
  });

  console.log("AI OUTPUT:");
  console.log(res.choices[0].message.content);
}

run();
