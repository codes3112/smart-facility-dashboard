# 🏢 Smart Facility Dashboard

An intelligent facility management dashboard that provides **real-time insights**, **AI-generated summaries**, and **energy usage analytics** for multiple zones. Built with **React (Vite)**, **Express**, and **OpenAI API**, it demonstrates full-stack integration and modern UI practices.

---

## 🚀 Features

- **AI-Powered Insights** — Real-time summaries powered by OpenAI GPT (with graceful fallback to mock mode).
- **Dynamic Reports** — View zone-wise metrics like energy usage, temperature, and timestamps.
- **Export to CSV** — One-click export that includes AI insights at the top of the report.
- **Robust Backend** — Node.js + Express server exposing `/api/ai-insight`.
- **Error & Loading Handling** — Cleanly handled network and AI API states.
- **Environment-Aware Mocking** — Works seamlessly even without a valid API key.
- **Authentication Flow** — Simple mock login using pre-configured credentials.

---

## 🔑 Demo Credentials

To log in, use:

```
Email: admin@example.com 
Password: password
```

*(Mock authentication — no external auth provider required.)*

---

## 🧠 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Dashboard   │  │   Reports    │  │   Settings   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│           │                 │                 │             │
│           └─────────────────┴─────────────────┘             │
│                           │                                 │
│                    AI Advisor Component                     │
│                           │                                 │
└───────────────────────────┼─────────────────────────────────┘
                            │
                    HTTP Request (POST)
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                  Backend (Express Server)                   │
│                                                              │
│  POST /api/ai-insight                                       │
│           │                                                  │
│           ├──► Check OPENAI_API_KEY                         │
│           │                                                  │
│           ├──► If valid: Call OpenAI API                    │
│           │                                                  │
│           └──► If invalid: Return mock insight              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/smart-facility-dashboard.git
   cd smart-facility-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Create a `.env` file in the project root:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=4000
   ```

4. **Run the project (both frontend + backend)**
   ```bash
   npm run dev
   ```
   
   This runs concurrently:
   - Frontend → http://localhost:5173
   - Backend → http://localhost:4000

---

## 🧩 How It Works

1. User logs in with mock credentials.
2. Dashboard loads mock or live facility data.
3. When "Generate AI Insight" is triggered:
   - The frontend sends a prompt to `/api/ai-insight`.
   - The backend calls OpenAI (or mock mode if no key).
   - AI insight is returned and displayed on the dashboard.
4. "Export Report" generates a CSV file with:
   - AI insight summary at the top.
   - Tabular data for each zone below.

---

## 🧠 Tech Stack

| Layer         | Technology                            |
| ------------- | ------------------------------------- |
| **Frontend**  | React (Vite) + ShadCN UI + TypeScript |
| **Backend**   | Node.js + Express                     |
| **AI**        | OpenAI API (gpt-4o-mini)              |
| **Styling**   | Tailwind CSS                          |
| **Utilities** | CSV export, dotenv, concurrently      |

---

## 💡 AI Configuration Modes

- **Live Mode:** Uses your actual OpenAI key.
- **Mock Mode:** Returns realistic random insights if API key is missing or quota is exceeded.

---

## 🛠️ Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `npm run dev`    | Runs both client + server          |
| `npm run client` | Runs Vite frontend only            |
| `npm run server` | Starts Express server with nodemon |

---

## 📦 Deployment Notes

- Ensure `.env` is **not** committed.
- Use `process.env.OPENAI_API_KEY` on the backend only.
- To deploy frontend and backend separately, update API URLs accordingly.

---

## 🧾 Example Output (AI Insight)

```
AI Summary:
"Zone 1 energy consumption increased slightly due to peak HVAC demand."

Zone, Energy Usage, Temperature, Timestamp
Zone A, 240 kWh, 22°C, 2025-11-06T08:00:00Z
Zone B, 310 kWh, 24°C, 2025-11-06T09:00:00Z
Zone C, 180 kWh, 21°C, 2025-11-06T09:30:00Z
```

---

## 👨‍💻 Author

**Sneha Arora**  
Senior Frontend Developer | Full-Stack Enthusiast  
Exploring how GenAI can power smarter dashboards and analytics.
