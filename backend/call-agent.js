import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function run() {
  // ✅ absolute path, no guessing
  const imagePath = path.join(
    __dirname,
    "test-assests",
    "building 14 gravel.jpg"
  );

  console.log("Looking for image at:", imagePath);

  if (!fs.existsSync(imagePath)) {
    throw new Error("Image not found at resolved path");
  }

  const imageBase64 = fs.readFileSync(imagePath, "base64");

const response = await client.responses.create({
  model: "wf_696132034a908190819c9f074d0b91a90077314",
  input: [
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: "Discipline: Electrical\nStage: Rough-In"
        },
        {
          type: "input_image",
          image_url: "https://upload.wikimedia.org/wikipedia/commons/3/3f/House_under_construction.jpg"
        }
      ]
    }
  ]
});

console.log(response.output_text);

console.log(response.output_text);


}

run();
