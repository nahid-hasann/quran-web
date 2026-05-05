📖 Quran Mazid Clone - Full Stack Job Task
A modern, fast, and feature-rich Quran reading application built with Next.js 15, Bun, Hono, and SQLite. This project demonstrates full-stack development capabilities, including database management, custom API creation, and a highly responsive user interface.

🚀 Features
114 Surahs with Arabic & Translation: Full Quranic data served from a local SQLite database.

Global Ayah Search: Powerful search functionality to find specific Ayahs based on keywords in translations.

Audio Auto-Play: Seamless listening experience where the next Ayah plays automatically after the current one finishes.

Customizable Display:

Switch between Standard Serif and Amiri Font.

Adjustable Arabic and Translation font sizes.

Persisted Settings: Your display preferences are saved automatically using localStorage.

Responsive Design: Fully optimized for Desktop, Tablet, and Mobile views.

🛠️ Tech Stack
Frontend: Next.js 15 (App Router), Tailwind CSS, TypeScript.

Backend: Hono (Lightweight Web Framework for Bun).

Database: SQLite (managed via bun:sqlite for high performance).

Runtime: Bun.

📦 Getting Started
1. Prerequisites
Make sure you have Bun installed on your system.

2. Backend Setup
Bash
cd server
bun install
bun seed.ts  # This will initialize and seed the SQLite database
bun index.ts # Starts the Hono server on http://localhost:5001
3. Frontend Setup
Bash
cd client
npm install
npm run dev  # Starts the Next.js app on http://localhost:3000
📂 Project Structure
/client: Next.js frontend application.

/server: Hono backend API and SQLite database management.

/server/quran.db: Local SQLite database containing all Surahs and Ayahs.

👤 Author
Md. Mahadi Hasan Nahed

MERN Stack Developer

BSS in Economics, Dhaka College

Ekhon ki korbe?
File Save koro: Ei README-ta save koro.

Repo Push koro: GitHub-e pura folder push koro (client + server).

Submission: Recruitment team-ke mail ba portal-e GitHub link ebong dorkar hole ekta choto screen recording (Loom/OBS diye) pathiye dao.