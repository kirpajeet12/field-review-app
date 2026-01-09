import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function run() {
  const response = await client.responses.create({
    model: "gpt-4.1",
    temperature: 0.2,

    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: `
You are an AI Field Review Assistant for construction inspections.

RULES:
- Observational language only
- No code compliance or approval statements
- Suggestions only
- Output JSON only

FORMAT:
{
  "description": string,
  "observations": string[],
  "deficiencies": string[]
}
            `
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Discipline: Electrical\nStage: Rough-In"
          },
          {
            type: "input_image",
            image_url:"https://raw.githubusercontent.com/kirpajeet12/field-review-app/main/backend/test-assests/building14gravel.jpg"

          }
        ]
      }
    ]
  });

  console.log("AI OUTPUT:");
  console.log(response.output_text);
}

run();

