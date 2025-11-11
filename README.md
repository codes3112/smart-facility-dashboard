## :compass: Smart Facility Dashboard (React + Express)

An intelligent facility management dashboard that demonstrates a modern **React application with secure authentication**, persistent sessions, **AI-generated summaries** with clean and modular architecture. Built with **React (Vite)**, **Express**, and **OpenAI API**. It's designed to reflect production-grade patterns — focusing on scalability, maintainability, and good user experience.

---

### :rocket: Tech Stack

| Layer         | Technology                                    |
| ------------- | --------------------------------------------- |
| **Frontend**  | React 19 + TypeScript                         |
| **Routing**   | React Router DOM                              |
| **State**     | Context API (AuthContext, LoaderContext)      |
| **HTTP**      | Axios                                         |
| **Styling**   | TailwindCSS + ShadCN UI                       |
| **Backend**   | Node.js + Express                             |
| **Auth**      | Cookie-based sessions (HTTP-only)             |
| **AI**        | OpenAI API (gpt-4o-mini)                      |
| **Utilities** | CSV export, dotenv, concurrently              |

---

### :jigsaw: Features

:closed_lock_with_key: **Authentication with persistent sessions**
- Uses secure HTTP-only cookies and a lightweight token system.
- Session persists across browser tabs (like Gmail).

:door: **Protected routes**
- Access control via `PrivateRoute` component.
- Redirects unauthenticated users to the login page.

:last_quarter_moon: **Dynamic layout**
- Smart conditional rendering of `Sidebar` and `Header` based on the route.

:zap: **Error & Loading Handling** — Cleanly handled network and AI API states.

:bricks: **Modular architecture**
- Clearly separated contexts, components, and routes.
- Mimics a real-world enterprise setup.

:brain: **AI-Powered Insights**
- Real-time summaries powered by OpenAI GPT (with graceful fallback to mock mode).
- Dynamic reports with zone-wise metrics like energy usage, temperature, and timestamps.

:page_facing_up: **Export to CSV**
- One-click export that includes AI insights at the top of the report.

---

### :brain: Design Decisions

**Session Management**
- Authentication tokens are stored in **HTTP-only cookies** (server-side managed) for security. The app verifies sessions on page load to ensure consistency and persistence.

**Context-Driven Architecture**
- The app uses `AuthContext` for authentication state and `LoaderContext` for consistent UX feedback during async actions.

**Separation of Concerns**
- `PrivateRoute`, `AuthProvider`, and layout components keep responsibilities isolated and predictable.

**User Experience**
- The app mirrors a professional dashboard pattern — persistent sidebar, smooth login/logout transitions, and stateful navigation.

---

### :gear: Running the Project

#### 1. Clone the repository
```bash
git clone https://github.com/codes3112/smart-facility-dashboard.git
cd smart-facility-dashboard
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Setup environment variables

Create a `.env` file in the project root:
```bash
OPENAI_API_KEY=your_openai_api_key_here
PORT=4000
```

#### 4. Start the servers
```bash
npm run dev
```

This runs concurrently:
- Frontend → http://localhost:5173
- Backend → http://localhost:4000

#### 5. Access the app

Visit **[http://localhost:5173](http://localhost:5173)** in your browser.

Use the following test credentials:
```
email: admin@example.com
password: password
```

---

### :speech_balloon: Notes

This demo focuses on:
- Component organization
- Authentication flow
- Secure session handling
- Clean and maintainable code
- AI integration with OpenAI API
- Modern React patterns with TypeScript

---

### 💡 AI Configuration Modes

- **Live Mode:** Uses your actual OpenAI key.
- **Mock Mode:** Returns realistic random insights if API key is missing or quota is exceeded.

---

### 🛠️ Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `npm run dev`    | Runs both client + server          |
| `npm run client` | Runs Vite frontend only            |
| `npm run server` | Starts Express server with nodemon |

---

### 📦 Deployment Notes

- Ensure `.env` is **not** committed.
- Use `process.env.OPENAI_API_KEY` on the backend only.
- To deploy frontend and backend separately, update API URLs accordingly.

---

### 👨‍💻 Author

**Sneha Arora**  
Senior Frontend Developer | React + TypeScript + Angular  
Passionate about building maintainable, user-friendly applications. Exploring how GenAI can power smarter dashboards and analytics.
