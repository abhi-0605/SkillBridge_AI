# SkillBridge AI

> AI-powered resume and job description analyzer that scores ATS compatibility, identifies skill gaps, and generates actionable recommendations to improve job applications.

**Live app:** [skillbridge-ai-abhi0605.vercel.app](https://skillbridge-ai-abhi0605.vercel.app) <br>
**Backend API:** [skillbridge-ai-e17b.onrender.com](https://skillbridge-ai-e17b.onrender.com)

---

## Overview

SkillBridge AI helps job seekers understand how well their resume matches a specific job. Users upload a resume (PDF or DOCX, parsed entirely client-side) and paste a job description. The platform then runs a four-stage AI/rules pipeline — keyword extraction, skill matching, ATS scoring, and report generation — and returns a detailed match report with a compatibility score, matched/missing skills, and specific AI-written recommendations.

## Screenshots

<img width="1917" height="912" alt="Screenshot 2026-07-26 014052" src="https://github.com/user-attachments/assets/bb4776fa-a0b0-4159-8d67-ea3c36689c75" />



## Score

<img width="676" height="188" alt="Screenshot 2026-07-26 014026" src="https://github.com/user-attachments/assets/e0063237-ba89-41bb-ac7f-b455748726a0" />



## Core Features

- **Client-side resume parsing** — PDF (via `pdfjs-dist`) and DOCX (via `mammoth`) are parsed entirely in the browser; only extracted plain text is ever sent to the backend.
- **Job description parsing** — paste-in JD text with optional title/company metadata.
- **Four-stage analysis pipeline:**
  1. **Keyword extraction** — AI-driven extraction of skills/technologies from both resume and JD.
  2. **Skill matching** — deterministic matching with alias normalization (e.g. `HTML5` ↔ `HTML`, `REST APIs` ↔ `REST API Development`) and substring/phrase matching.
  3. **ATS scoring** — weighted score combining keyword match, skill match, and rule-based formatting checks (section presence, length, special-character ratio).
  4. **Report generation** — AI-written summary, strengths, weaknesses, and specific recommendations.
- **Authentication** — email/password and Google OAuth, JWT-based sessions, User/Admin roles (schema is subscription-plan-ready for future billing).
- **Dashboard** — overview with stats and recent analyses, full analysis history (Reports), per-analysis detail view, and profile page.
- **Pluggable AI provider layer** — a single `generateAIResponse()` interface abstracts the underlying model. Local development uses **Ollama** (free, private, runs on-device); production uses **Groq** (fast, free-tier cloud inference) since Ollama cannot run on serverless/managed hosts. OpenAI/Claude/Gemini can be added as additional providers without touching agent code.

## Architecture
SkillBridge_AI/ <br>
├── client/ React + Vite (JavaScript) frontend, Tailwind CSS v4  <br>
├── server/ Node.js + Express backend, MongoDB (Atlas) via Mongoose


**Frontend:** React Router for routing, TanStack React Query for data-fetching infra, Framer Motion for animation, Axios for API calls. No TypeScript, no TanStack Router — plain JS + React Router by design.

**Backend:** Express REST API, Mongoose ODM, JWT auth (cookie + bearer token), Passport.js for Google OAuth, Zod for request validation.

**Database:** MongoDB Atlas. Core collections: `users`, `resumes`, `jobdescriptions`, `analyses`, `reports`.

**AI:** Provider-agnostic abstraction (`services/ai/aiProvider.js`) selects the active provider via the `AI_PROVIDER` environment variable. Agents (`services/agents/`) call this single interface and never talk to a specific provider directly.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS v4, React Router, React Query, Framer Motion, Axios, pdfjs-dist, mammoth |
| Backend | Node.js, Express, Mongoose, JWT, Passport (Google OAuth), Zod, bcryptjs |
| Database | MongoDB Atlas |
| AI (dev) | Ollama (local, `llama3.1`) |
| AI (prod) | Groq (`llama-3.3-70b-versatile`) |
| Hosting | Vercel (frontend), Render (backend) |

## Local Development Setup

### Prerequisites
- Node.js 20.x
- [Ollama](https://ollama.com) installed locally, with a model pulled (`ollama pull llama3.1`)
- A MongoDB Atlas cluster (or local MongoDB)
- A Google Cloud OAuth client (for Google Sign-In)

### Backend

```bash
cd server
npm install
```

Create `server/.env`:



Run the server:

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
```


Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:5173`.

## Deployment

- **Backend (Render):** Root directory `server`, build command `npm install`, start command `npm start`. Environment variables mirror the local `.env` above, with `NODE_ENV=production` and `AI_PROVIDER=groq` (Ollama is dev-only, since it requires a persistent local process that free/managed hosts don't provide).
- **Frontend (Vercel):** Root directory `client`, framework preset Vite. Environment variable `VITE_API_URL` pointed at the deployed Render API URL.
- After deploying both, update `CLIENT_URL` (Render) and the Google Cloud Console's authorized redirect URIs/JavaScript origins to include the production URLs.


