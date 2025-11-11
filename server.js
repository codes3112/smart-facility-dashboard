import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { generateAiInsights } from "./src/lib/generateAiInsights.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Important: allow sending cookies
}));
const mockUser = { email: "admin@example.com", name: "Admin User" };
function generateMockToken() {
  return Math.random().toString(36).substring(2);
}
// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  await new Promise(resolve => setTimeout(resolve, 1000)); // simulate network
  if (email === "admin@example.com" && password === "password") {
    const token = generateMockToken();
    const expires = new Date(Date.now() + 30 * 60 * 1000);
    res.cookie("auth_token", token, {
      httpOnly: true, // JS cannot access
      secure: false, // set true in production (HTTPS)
      sameSite: "lax",
      expires,
    });
    res.json({ success: true, user: mockUser });
  } else {
    res.status(401).json({ success: false, error: "Invalid credentials" });
  }
});
// Logout route
app.post("/api/logout", async (req, res) => {
  res.clearCookie("auth_token", { httpOnly: true, sameSite: "lax" });
  res.json({ success: true });
});
// Fetch current user
app.get("/api/user", (req, res) => {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json({ user: null });
  // Normally you would verify JWT or lookup in DB
  res.json({ user: mockUser });
});


app.post("/api/ai-insight", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  try {
    const result = await generateAiInsights(prompt);
    res.json(result);
  } catch (error) {
    // Extract error details
    const errorCode = error?.code || 'UNKNOWN';
    const errorMessage = error?.message || 'An unexpected error occurred';
    const statusCode = error?.statusCode || 500;
    
    // Map error codes to appropriate HTTP status codes
    let httpStatus = statusCode;
    if (errorCode === 'invalid_api_key' || errorCode === 401) {
      httpStatus = 401;
    } else if (errorCode === 'rate_limit_exceeded' || errorCode === 429) {
      httpStatus = 429;
    } else if (errorCode === 'insufficient_quota' || errorCode === 402) {
      httpStatus = 402;
    }
    
    // Return structured error response
    res.status(httpStatus).json({
      error: errorMessage,
      code: errorCode,
      timestamp: error?.timestamp || new Date().toISOString(),
    });
  }
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