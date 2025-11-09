import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateAiInsights } from "./src/lib/generateAiInsights.js"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ai-insight", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  const result = await generateAiInsights(prompt);
  res.json(result);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if(process.env.OPENAI_API_KEY){
   console.log("OpenAI API Key loaded:", !!process.env.OPENAI_API_KEY);
  }else{
     console.log('No OpenAi API key found - running in mock mode');
  }
});