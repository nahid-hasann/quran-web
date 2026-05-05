import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SurahSidebar from "./components/SurahSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quran App - Job Task",
  description: "Next.js Quran Web Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#121212] text-white flex h-screen overflow-hidden`}>

        {/* 1. Left Icon Sidebar (Fixed) */}
        <nav className="w-16 border-r border-gray-800 flex flex-col items-center py-6 space-y-10 bg-[#1a1a1a] flex-shrink-0">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-green-900/20">
            Q
          </div>
          <div className="flex flex-col space-y-6 text-gray-400">
            <div className="p-2 hover:bg-gray-800 hover:text-white rounded-lg cursor-pointer transition-all">
              <span className="text-xl">🏠</span>
            </div>
            <div className="p-2 hover:bg-gray-800 hover:text-white rounded-lg cursor-pointer transition-all">
              <span className="text-xl">📖</span>
            </div>
            <div className="p-2 hover:bg-gray-800 hover:text-white rounded-lg cursor-pointer transition-all">
              <span className="text-xl">⚙️</span>
            </div>
          </div>
        </nav>

        {/* 2. Middle Surah Sidebar (Scrollable) */}
        <SurahSidebar />

        {/* 3. Main Content Area (Scrollable) */}
        <main className="flex-1 overflow-y-auto bg-[#121212]">
          {children}
        </main>

      </body>
    </html>
  );
}