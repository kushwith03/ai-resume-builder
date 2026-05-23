# AI Resume Builder

A full-stack web application that allows users to quickly generate professional resumes using AI. Users can input a brief description of their experience, and the integrated Gemini AI will structure it into a complete, editable resume.

**[View Live Demo]** 
*Frontend: [Vercel Deployment Link Placeholder]* | *Backend API: [Render Deployment Link Placeholder]*

---

## 📸 Previews
*[Insert Animated GIF/Video Demo Placeholder]*
*[Insert Screenshot of PDF Preview Placeholder]*

---

## ⚡ Features

- **AI-Powered Generation:** Converts natural language descriptions into structured JSON resumes using Google Gemini.
- **Live PDF Preview:** Debounced client-side rendering ensures the UI remains at 60FPS during continuous typing.
- **Secure Authentication:** JWT-based authentication using `httpOnly` cookies to protect user data and sessions.
- **Persistent Storage:** Resumes are saved to MongoDB, allowing users to return and edit their documents later.
- **ATS Friendly:** The generated PDF layouts are text-selectable and designed to pass standard Applicant Tracking Systems.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS + DaisyUI
- **State & Forms:** `react-hook-form`
- **PDF Generation:** `@react-pdf/renderer`

### Backend
- **Runtime:** Node.js (Express)
- **Database:** MongoDB (Mongoose)
- **AI Integration:** Google Generative AI SDK (`gemini-flash-latest`)
- **Authentication:** `jsonwebtoken`, `bcryptjs`

---

## 🚀 Local Development Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (running locally or an Atlas connection string)
- [Google Gemini API Key](https://aistudio.google.com/)

### 2. Backend Setup
\`\`\`bash
cd server
npm install
cp .env.example .env
\`\`\`
Edit `server/.env` with your credentials:
\`\`\`env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/resume-builder
JWT_SECRET=your_super_secret_key_here
GEMINI_API_KEY=your_actual_api_key_here
ALLOWED_ORIGIN=http://localhost:5173
\`\`\`
Start the server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup
\`\`\`bash
# From the project root
npm install
cp .env.example .env
\`\`\`
Edit `.env` (default usually works):
\`\`\`env
VITE_API_URL=http://localhost:8080/api/v1
\`\`\`
Start the client:
\`\`\`bash
npm run dev
\`\`\`

---

## 🧠 Technical Highlights

### Debounced PDF Rendering
Generating complex PDFs on the main thread is computationally expensive. To prevent UI lockups while typing in the form, the `ResumePDF` component is wrapped with a custom `useDebounce` hook. This ensures the renderer only recalculates the layout after the user pauses typing, sustaining a smooth 60FPS input experience.

### AI Error Recovery
The Gemini API occasionally wraps its JSON responses in markdown blocks (e.g., \`\`\`json\`). The `aiService` includes a stripping utility to clean hallucinated markdown before parsing, preventing hard crashes during resume generation.
