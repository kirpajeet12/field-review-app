

import "dotenv/config";
import express from "express";
import multer from "multer";
import fs from "fs";
import OpenAI from "openai";
import { generateReport } from "./report.js";

const app = express();
const upload = multer({ dest:"uploads/" });
app.use(express.json());
app.use(express.static("frontend"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/analyze", upload.array("photos"), async (req,res)=>{
  const { discipline, stage } = req.body;

  const images = [];
  for(const f of req.files){
    const b64 = fs.readFileSync(f.path,{encoding:"base64"});

    const ai = await openai.chat.completions.create({
      model:"gpt-4o-mini",
      temperature:0.2,
      messages:[
        { role:"system", content:
`You are an AI field review assistant.
Do NOT declare code violations.
Observational language only.
Return JSON only.`},
        { role:"user", content:[
          { type:"text", text:`Discipline:${discipline}\nStage:${stage}`},
          { type:"image_url", image_url:{url:`data:image/jpeg;base64,${b64}`} }
        ]}
      ]
    });

    const parsed = JSON.parse(ai.choices[0].message.content);
    images.push(parsed);
  }

  res.json({ discipline, stage, images });
});

app.post("/report",(req,res)=>{
  const report = generateReport(req.body);
  res.setHeader("Content-Disposition","attachment; filename=report.txt");
  res.send(report);
});

app.listen(3000,()=>console.log("Running http://localhost:3000"));
