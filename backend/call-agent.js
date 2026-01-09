import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function run() {
  const imageBase64 = fs.readFileSync(
    "backend/test-assets/test.jpg",
    "base64"
  );

  const response = await client.responses.create({
    // 🔑 THIS IS THE FIX
    model: "wf_696132034a908190819c9f074d0b91a90077314",

    input: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Discipline: Electrical\nStage: Rough-In"
          },
          {
            type: "input_image",
            image_base64: imageBase64
          }
        ]
      }
    ]
  });

  console.log("AGENT OUTPUT:");
  console.log(response.output_text);
}

run();
