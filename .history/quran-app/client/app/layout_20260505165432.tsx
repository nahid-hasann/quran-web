import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SurahSidebar from "./components/SurahSidebar";
import SettingsPanel from "./components/SettingsPanel";

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

        {/* 1. Left Icon Sidebar */}
        <nav className="hidden sm:flex w-16 border-r border-gray-800 flex-col items-center py-6 space-y-10 bg-[#1a1a1a] flex-shrink-0">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">
            Q
          </div>
          <div className="flex flex-col space-y-6 text-gray-400">
            <div className="p-2 hover:bg-gray-800 hover:text-white rounded-lg cursor-pointer transition-all text-xl">🏠</div>
            <div className="p-2 hover:bg-gray-800 hover:text-white rounded-lg cursor-pointer transition-all text-xl">📖</div>
            <div className="p-2 hover:bg-gray-800 hover:text-white rounded-lg cursor-pointer transition-all text-xl">⚙️</div>
          </div>
        </nav>

        {/* 2. Middle Surah Sidebar (Hidden on Mobile) */}
        <div className="hidden md:block flex-shrink-0">
          <SurahSidebar />
        </div>

        {/* 3. Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#121212]">
          {children}
        </main>

        {/* 4. Right Settings Panel (Hidden on Tablets/Mobile) */}
        <div className="hidden lg:block flex-shrink-0">
          <SettingsPanel />
        </div>

      </body>
    </html>
  );
}