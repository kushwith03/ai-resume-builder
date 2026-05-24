# InstaResume - Premium AI Resume Builder

InstaResume is a high-performance, SaaS-style resume builder powered by Google Gemini AI. It transforms simple career descriptions into professional, ATS-optimized resumes with a real-time side-by-side editing experience and instant high-fidelity PDF export.

## 🔗 Live Demo
- **Frontend:** [https://ai-resume-builder-sigma-jet.vercel.app](https://ai-resume-builder-sigma-jet.vercel.app)
- **API Health Check:** [https://instaresume-api-8o52.onrender.com/api/health](https://instaresume-api-8o52.onrender.com/api/health)

---

## 🚀 Key Features

- **AI-Driven Architecture:** Leverages Gemini 1.5 Flash to generate structured, professional resume content from natural language.
- **Real-Time A4 Preview:** A dedicated document viewer providing a high-fidelity, side-by-side live preview of your resume.
- **ATS Optimization:** Intelligent keyword matching and scoring system to ensure your resume passes recruiter filters.
- **Professional SaaS UI:** Modern, medium-dark "SaaS Dim" aesthetic built with Tailwind CSS and DaisyUI.
- **Secure Cloud Sync:** JWT-authenticated user sessions with MongoDB Atlas for saving and retrieving resume drafts.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS + DaisyUI
- **PDF Engine:** @react-pdf/renderer
- **State Management:** React Hook Form
- **Icons:** React Icons

### Backend
- **Runtime:** Node.js + Express
- **AI Integration:** Google Gemini AI API
- **Database:** MongoDB Atlas (Mongoose)
- **Security:** JWT Authentication + BcryptJS
- **Middleware:** CORS, Cookie-Parser, Dotenv

---

## 📸 Screenshots & Demo

*(Add high-resolution screenshots or a GIF here for portfolio showcase)*

---

## 💻 Local Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Google Gemini AI API Key

### 2. Backend Installation
```bash
cd server
npm install
cp .env.example .env
# Update .env with your MONGODB_URI and GEMINI_API_KEY
npm start
```

### 3. Frontend Installation
```bash
# In the root directory
npm install
# Update .env with VITE_API_URL=http://localhost:8080
npm run dev
```

---

## 🌐 Production Deployment

### Backend (Render)
1. **New Web Service:** Connect your GitHub repo.
2. **Root Directory:** `server`.
3. **Build Command:** `npm install`.
4. **Start Command:** `npm start`.
5. **Environment Variables:**
   - `MONGODB_URI`: Your production database string.
   - `GEMINI_API_KEY`: Your API key.
   - `JWT_SECRET`: A secure random string.
   - `ALLOWED_ORIGIN`: `https://ai-resume-builder-sigma-jet.vercel.app`.

### Frontend (Vercel)
1. **New Project:** Connect your GitHub repo.
2. **Framework Preset:** `Vite`.
3. **Output Directory:** `dist`.
4. **Environment Variables:**
   - `VITE_API_URL`: `https://instaresume-api-8o52.onrender.com`.

---

## 🛡️ Engineering Standards
- ✅ **Dynamic CORS:** Adaptive origin validation for production and local environments.
- ✅ **SPA Routing:** `vercel.json` rewrite rules for seamless React Router refreshes.
- ✅ **Performance:** Debounced rendering logic for smooth real-time preview updates.
- ✅ **Security:** Zero-secrets committed; all sensitive data managed via environment variables.

---

Built with ❤️ by [Kushwith_03](https://github.com/kushwith03)
