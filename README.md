# 🕋 Quran Mazid Clone - Full Stack Job Task

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/Bun-1.3-fbf0df?style=for-the-badge&logo=bun" />
  <img src="https://img.shields.io/badge/Hono-API-ff5722?style=for-the-badge&logo=hono" />
  <img src="https://img.shields.io/badge/SQLite-Database-003b57?style=for-the-badge&logo=sqlite" />
</p>

---

## ✨ Key Highlights

*   **⚡ High Performance**: Built with Bun and Hono for lightning-fast API responses.
*   **🔊 Immersive Audio**: Integrated **Audio Auto-Play** logic for a seamless listening experience.
*   **🔍 Advanced Search**: Global Ayah search directly from the SQLite database.
*   **🎨 Personalized UI**: Interactive settings to change fonts (Amiri/Serif) and adjust sizes in real-time.
*   **📱 Fully Responsive**: Crafted with Tailwind CSS for all screen sizes.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology Used |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), Tailwind CSS, TypeScript |
| **Backend** | Hono (lightweight framework for Bun) |
| **Database** | SQLite (using `bun:sqlite` for native performance) |
| **State Management** | React Hooks & LocalStorage for persistence |

---

## 🚀 Installation & Setup

### 1. Backend (Server)
```bash
cd server
bun install
bun seed.ts  # Initializes 114 Surahs with translations
bun index.ts # Runs API on http://localhost:5001
2. Frontend (Client)
Bash
cd client
npm install
npm run dev  # Runs app on http://localhost:3000
📂 Project Structure
Plaintext
.
├── client/           # Next.js Frontend
│   └── app/          # Modern App Router logic
├── server/           # Bun + Hono Backend
│   ├── quran.db      # SQLite Database
│   ├── seed.ts       # Database Seeding Script
│   └── index.ts      # API Server
└── README.md


🤝 Contact & Submission
Md. Mahadi Hasan Nahed
MERN Stack Developer
📍 Rangpur, Bangladesh (Now in Dhaka)
