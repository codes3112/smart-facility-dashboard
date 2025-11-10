import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { generateAiInsights } from "./src/lib/generateAiInsights.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Allow sending cookies
}));

const mockUser = { email: "admin@example.com", name: "Admin User" };

function generateMockToken() {
  return Math.random().toString(36).substring(2);
}
// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  // Simulate network delay to show loader
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email === "admin@example.com" && password === "password") {
    const token = generateMockToken();
    const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 mins
    res.cookie("auth_token", token, {
      httpOnly: true,
      expires,
      sameSite: "lax",
    });
    res.json({ success: true, user: mockUser, token });
  } else {
    res.status(401).json({ success: false, error: "Invalid credentials" });
  }
});

// Logout route
app.post("/api/logout", async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  res.clearCookie("auth_token");
  res.json({ success: true });
});

// Get current user route
app.get("/api/user", (req, res) => {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json({ user: null });
  res.json({ user: mockUser });
});


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