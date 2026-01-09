export function generateReport(data){
  let r = `FIELD REVIEW REPORT\n\n`;
  r += `Discipline: ${data.discipline}\nStage: ${data.stage}\n\n`;

  data.images.forEach((img,i)=>{
    r += `Image ${i+1}\n`;
    r += `Description: ${img.description}\n`;
    r += `Observations:\n- ${img.observations.join("\n- ")}\n`;
    r += `Deficiencies:\n- ${img.deficiencies.join("\n- ")}\n\n`;
  });

  r += "AI-assisted observations. Final judgment by reviewer.\n";
  return r;
}
 
