import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function run() {
  // Load test image
  const imageBase64 = fs.readFileSync(
    "backend/test-assets/test.jpg",
    "base64"
  );

  // Call your OpenAI Agent (Workflow)
  const response = await client.responses.create({
    workflow: "wf_696132034a908190819c9f074d0b91a90077314", // 👈 YOUR WORKFLOW ID
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
