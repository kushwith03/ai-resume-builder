# AI Resume Builder (React + Tailwind)

Build a clean, professional resume in minutes. Describe your background in plain English and the app structures it into a polished resume you can preview and export to PDF—plus a full form editor to tweak every section.

![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC) ![daisyUI](https://img.shields.io/badge/daisyUI-4-5A0EF8)

---

## ✨ Features

- **AI-assisted resume generation**
  - Send a short description of your experience; the app calls a backend endpoint to generate a structured resume draft.
  - API contract: `POST /api/v1/resume/generate` with body `{ userDescription: string }`.

- **Form-based resume editor**
  - Edit every section with dynamic, repeatable fields powered by `react-hook-form`.
  - Sections supported out of the box:
    - **Personal Information** (name, email, phone, links)
    - **Summary**
    - **Skills**
    - **Experience**
    - **Education**
    - **Projects**
    - **Certifications**
    - **Languages**
    - **Interests**

- **Live preview & export**
  - Instant resume preview component.
  - **Export to PDF** using `html-to-image` + `jsPDF`.
  - **Print-ready** via `react-to-print`.

- **Modern, responsive UI**
  - Tailwind CSS + daisyUI components for accessible, mobile-first design.
  - Toast notifications for user feedback.

- **Client-side routing**
  - Landing, About, Services, Contact, and Generate Resume routes with nested layout.

---

## 🧱 Tech Stack

**Frontend**
- React 18 + Vite 6
- React Router v7
- Tailwind CSS 3 + daisyUI

**State & Forms**
- `react-hook-form` with `useFieldArray` for dynamic lists

**Networking**
- Axios (`src/api/ResumeService.js`)  
  - Centralized `axiosInstance` with base URL (currently `http://localhost:8080`)

**Export & Utilities**
- `html-to-image` and `jsPDF` for PDF export
- `react-to-print` for print
- `react-hot-toast` for notifications
- `react-icons` for iconography
- (Optional) `react-tsparticles` for decorative effects

**Tooling**
- ESLint 9 + React plugins
- Tailwind/PostCSS pipeline
- Vite dev/build/preview scripts

---
## 🗂️ Project Structure
```
SCT_WD_3/
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
├─ src/
│ ├─ main.jsx # Router setup + Toaster
│ ├─ index.css # Tailwind base styles
│ ├─ App.css
│ ├─ api/
│ │ └─ ResumeService.js # axios instance + generateResume API
│ ├─ Components/
│ │ ├─ Navbar.jsx # Top navigation
│ │ └─ Resume.jsx # Resume preview + PDF export/print
│ └─ pages/
│ ├─ Root.jsx # Shared layout (wraps nested routes)
│ ├─ Home.jsx # Landing wrapper
│ ├─ Landingpage.jsx # Marketing hero + feature highlights
│ ├─ GenerateResume.jsx # AI prompt + full form editor UI
│ ├─ About.jsx
│ ├─ Services.jsx
│ └─ Contact.jsx
└─ public/
└─ vite.svg
```


