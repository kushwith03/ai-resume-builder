# ResuAI - AI Resume Builder

ResuAI is a premium, high-performance resume builder powered by Gemini AI. It architects professional, ATS-optimized resumes from simple text descriptions, providing a side-by-side live A4 preview and instant PDF export.

## 🚀 Key Features

- **AI-Driven Generation:** Transform career descriptions into structured resume data using Gemini AI.
- **Side-by-Side Editor:** Professional editing experience with a sticky, real-time A4 preview.
- **ATS Optimization:** Precision keyword matching and optimization score.
- **Instant Export:** Generate high-quality, ATS-friendly PDFs directly in the browser.
- **SaaS Aesthetic:** Modern, medium-dark professional theme with responsive design.
- **Secure Storage:** Save and sync your progress to the cloud with MongoDB and JWT.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, DaisyUI, React Hook Form, @react-pdf/renderer.
- **Backend:** Node.js, Express, MongoDB Atlas, JWT.
- **AI:** Google Gemini API (Flash 1.5).
- **Deployment:** Render (Backend), Vercel (Frontend).

---

## 💻 Local Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API Key

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Update .env with your credentials
npm start
```

### 3. Frontend Setup
```bash
# In the root directory
npm install
cp .env.example .env
# Update .env with VITE_API_URL=http://localhost:8080
npm run dev
```

---

## 🌐 Deployment Instructions

### Backend (Render)
1. Create a **New Web Service** on Render.
2. Set **Root Directory** to `server`.
3. Build Command: `npm install`.
4. Start Command: `npm start`.
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `GEMINI_API_KEY`: Your Gemini API key.
   - `JWT_SECRET`: A long random string.
   - `ALLOWED_ORIGIN`: Your production frontend URL (once deployed).

### Frontend (Vercel)
1. Create a **New Project** on Vercel.
2. Framework Preset: **Vite**.
3. Set **Root Directory** to `./`.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Add Environment Variable:
   - `VITE_API_URL`: Your Render backend URL.

---

## 📝 Environment Variables

### Backend (`server/.env`)
- `PORT`: Server port (default: 8080).
- `MONGODB_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for authentication.
- `GEMINI_API_KEY`: Google Gemini API key.
- `ALLOWED_ORIGIN`: Frontend URL for CORS.

### Frontend (`.env`)
- `VITE_API_URL`: Backend server URL.

---

## 🛡️ Production Readiness
- ✅ **Health Check:** `GET /api/health` available for monitoring.
- ✅ **CORS:** Hardened for production with dynamic origin validation.
- ✅ **SPA Routing:** `vercel.json` included for seamless page refreshes.
- ✅ **Security:** JWT-based auth and environment-driven secrets.

---

Built with ❤️ by [Kushwith_03](https://github.com/kushwith03)
