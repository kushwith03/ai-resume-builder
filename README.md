# AI Resume Maker 🚀
### *Turn your career story into a professional resume with AI-driven precision.*

Built for modern job seekers, this **Full-Stack AI Resume Builder** combines high-performance React architecture with intelligent data parsing. It doesn't just build resumes—it optimizes them for ATS compatibility and ensures a fluid, professional experience.

---

## ✨ Key Features

- 🤖 **AI-Powered Generation:** Real integration with **Google Gemini 1.5 Flash** to transform career bios into structured, professional resumes instantly.
- 🎯 **Live ATS Optimizer:** Real-time keyword matching against job descriptions with actionable gap identification.
- 🏎️ **Performance First:** Optimized rendering engine maintaining UI fluidity during complex data entry using `react-hook-form` and structural memoization.
- 📄 **ATS-Friendly PDF:** Text-based professional PDF generation using `@react-pdf/renderer` (not image-based, ensuring 100% parsability by recruitment software).
- 🔒 **Secure Persistence:** JWT authentication with **httpOnly cookies** and MongoDB storage for anytime-access to your resumes.
- 📊 **Metric-Driven UI:** Integrated performance monitoring to track UI fluidity and render latency in real-time via the PerformanceObserver API.

---

## 🛠 Tech Stack

**Frontend:**
- **React 18** (Vite)
- **Tailwind CSS + DaisyUI** (Aesthetic & Responsive UI)
- **React Hook Form** (Uncontrolled inputs for high-performance form management)
- **@react-pdf/renderer** (Text-based, declarative document generation)

**Backend:**
- **Node.js + Express** (RESTful API with **Controller-Service** architecture)
- **Google Gemini SDK** (LLM integration for resume content generation)
- **MongoDB + Mongoose** (Data Persistence)
- **JWT + Cookie-Parser** (Secure Authentication with httpOnly cookies)

---

## 🏗 System Architecture

The project follows a modular **Controller-Service-Repository** pattern:
- **Frontend:** Modular component architecture with decoupled API services, performance tracking utilities, and a dedicated PDF template layer.
- **Backend:** Business logic (AI prompt engineering, validation) is isolated in the **Service Layer**, keeping controllers lean and focused on request orchestration.

---

## 📈 Key Highlights

- **UI Fluidity:** Achieved a stable and responsive user experience by implementing `React.memo` and utilizing uncontrolled components for high-frequency input sections.
- **ATS Compatibility:** Switched to text-layer PDF generation, ensuring resumes are fully readable by corporate Applicant Tracking Systems.
- **Security:** Enhanced authentication security by moving JWT storage from localStorage to secure **httpOnly cookies**.

---

## 📂 Folder Structure

```text
├── server/               # Node.js + Express Backend
│   ├── src/models/       # Mongoose Schemas (User, Resume, Analytics)
│   ├── src/services/     # Business Logic (AI integration, validation)
│   ├── src/controllers/  # Request Handlers
│   └── src/middleware/   # Auth & Validation Middleware
├── src/                  # React Frontend
│   ├── api/              # Axios Interceptors & Service Layer
│   ├── Components/       # Modular UI & PDF Components
│   ├── services/         # ATS Logic
│   └── utils/            # Performance Tracking & Utilities
```

---

## 🚀 Setup Instructions

1. **Clone the repository**
2. **Backend Setup:**
   ```bash
   cd server
   npm install
   # Create .env based on .env.example with:
   # PORT, MONGODB_URI, JWT_SECRET, and GEMINI_API_KEY
   npm start
   ```
3. **Frontend Setup:**
   ```bash
   npm install
   # Create .env with VITE_API_URL=http://localhost:8080
   npm run dev
   ```

---

## 🔮 Future Improvements
- **Multi-template Support:** Switch between Modern, Academic, and Minimalist layouts.
- **LinkedIn Sync:** One-click import via LinkedIn profile scraping.
- **Real-time Collaboration:** Shareable links for resume review.
