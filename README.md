# InstaResume — AI-Powered Resume Generator

A high-performance full-stack application designed to transform career descriptions into professional, ATS-optimized resumes using Generative AI.

## Overview

InstaResume solves the modern hiring challenge by bridging the gap between raw experience and recruiter-friendly documentation. It features a sophisticated AI-orchestrated pipeline for professional content synthesis and real-time PDF generation.

- **Frontend:** [ai-resume-builder-sigma-jet.vercel.app](https://ai-resume-builder-sigma-jet.vercel.app)
- **Backend API:** [instaresume-api-8o52.onrender.com](https://instaresume-api-8o52.onrender.com)

## Key Engineering Features

- **AI Content Architect:** Integrated **Google Gemini AI v1.5** for automated, impact-focused bullet point and summary generation.
- **Dynamic State Engine:** Built with **React Hook Form** and debounced state updates for a smooth, high-fidelity live preview rendering.
- **Vector-Based PDF Export:** Engineered client-side PDF generation using **@react-pdf/renderer**, ensuring lightweight and standard-compliant professional output.
- **Full-Stack Security:** Implemented secure JWT-based authentication and MongoDB persistence for encrypted user data management.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **AI Integration:** Google Generative AI (Gemini SDK)
- **Deployment:** Vercel (UI) & Render (API)

## Setup & Installation

1. **Clone and Install:**
   ```bash
   git clone https://github.com/kushwith03/ai-resume-builder.git
   cd ai-resume-builder
   npm install
   ```

2. **Backend Setup:**
   Create a `.env` file in the `server/` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_secret
   API_KEY=your_google_gemini_api_key
   ```

3. **Run Application:**
   ```bash
   # In root (Frontend)
   npm run dev
   
   # In server/ (Backend)
   npm start
   ```

## Author

**R Khushwith Kumar**  
Full Stack Software Engineer  
[Portfolio](https://rkhushwith-portfolio.vercel.app) • [GitHub](https://github.com/kushwith03) • [LinkedIn](https://linkedin.com/in/kushwith03)
