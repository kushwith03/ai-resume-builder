# InstaResume • AI-Powered ATS Resume Builder

InstaResume is a modern full-stack application designed to solve the modern resume challenge. It leverages Generative AI to transform plain-text career descriptions into high-performance, ATS-optimized resumes. This project explores the intersection of AI integration, complex state management, and professional document rendering.

Built & developed by **R Khushwith Kumar** (Final Year CSE Student).

---

## 🔗 Live Project & Links

- **Frontend:** [ai-resume-builder-sigma-jet.vercel.app](https://ai-resume-builder-sigma-jet.vercel.app)
- **Backend API:** [instaresume-api-8o52.onrender.com](https://instaresume-api-8o52.onrender.com)
- **Developer Portfolio:** [rkhushwith-portfolio.vercel.app](https://rkhushwith-portfolio.vercel.app/)

---

## ✨ Core Features

- **AI Resume Architect:** Uses **Gemini AI v1.5** to generate professional impact-focused bullet points and summaries from raw user input.
- **ATS Optimization:** Specifically engineered layouts and keyword matching logic to ensure high readability for Applicant Tracking Systems.
- **Real-time Analytics:** Custom scoring algorithm providing instant feedback on resume quality and job alignment.
- **Smart PDF Export:** Client-side high-fidelity PDF generation using `@react-pdf/renderer` for standardized professional output.
- **Live Interactive Editor:** A side-by-side editing experience with real-time preview and instant UI updates.

---

## 🛠️ Tech Stack

### Frontend
- **React + Vite** (High-performance UI)
- **TailwindCSS** (Modern, dark futuristic aesthetic)
- **DaisyUI** (Accessible component primitives)
- **React Hook Form** (Clean form state management)

### Backend & AI
- **Node.js + Express** (Scalable REST API)
- **Google Gemini AI v1.5** (LLM for professional content generation)
- **MongoDB + Mongoose** (Flexible document storage)
- **JWT + Cookies** (Secure stateless authentication)

---

## 🏗️ Architecture Overview

The system follows a classic **client-server architecture** with a heavy focus on client-side rendering performance:
1. **Ingestion:** User inputs career details via a multi-step interactive form.
2. **Generation:** Backend sanitizes data and orchestrates prompts to Gemini AI for content synthesis.
3. **Validation:** Resume data is matched against common ATS parsing rules and scored in real-time.
4. **Rendering:** The frontend utilizes vector-based rendering to ensure PDFs are lightweight and parseable.

---

## 🚀 Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kushwith03/ai-resume-builder.git
   ```

2. **Frontend Setup:**
   ```bash
   npm install
   npm run dev
   ```

3. **Backend Setup:**
   - Create a `.env` in the `server/` directory with: `PORT`, `MONGO_URI`, `JWT_SECRET`, and `GEMINI_API_KEY`.
   ```bash
   cd server
   npm install
   npm start
   ```

---

## 💡 What I Learned

- **LLM Integration:** Successfully implemented prompt engineering patterns to ensure deterministic and structured JSON outputs from AI.
- **Full-Stack Engineering:** Deepened my understanding of the MERN stack, specifically handling complex nested states in React and architecting secure backend routes.
- **UX Design:** Focused on building a highly polished, interactive experience using custom CSS variables and modern UI libraries while maintaining performance.

---

## 👨‍💻 Developer

**R Khushwith Kumar**  
Final Year CSE Student | Full-Stack Developer  
Specializing in MERN Stack & AI-Integrated Applications

[GitHub](https://github.com/kushwith03) • [LinkedIn](https://www.linkedin.com/in/kushwith03/) • [Portfolio](https://rkhushwith-portfolio.vercel.app/)

<p align="center">
  Built with ❤️ by <a href="https://github.com/kushwith03">kushwith03</a>
</p>
