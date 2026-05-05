"use client";
import { useState } from "react";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import SurahSidebar from "./components/SurahSidebar";
import SettingsPanel from "./components/SettingsPanel";

const inter = Inter({ subsets: ["latin"] });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: '--font-amiri' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showSurahList, setShowSurahList] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <html lang="en" className={`dark ${amiri.variable}`}>
      <body className={`${inter.className} bg-[#121212] text-white flex h-screen overflow-hidden`}>

        {/* Mobile Header (Fixed Top) */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1a1a1a] border-b border-gray-800 flex items-center justify-between px-4 z-50">
          <button onClick={() => setShowSurahList(!showSurahList)} className="p-2 text-green-500">☰ Surah</button>
          <div className="font-bold text-green-500 text-xl">Quran App</div>
          <button onClick={() => setShowSettings(!showSettings)} className="p-2 text-green-500 text-xl">⚙️</button>
        </div>

        {/* 1. Left Icon Sidebar (Desktop Only) */}
        <nav className="hidden lg:flex w-20 border-r border-gray-800 flex-col items-center py-8 space-y-10 bg-[#1a1a1a] flex-shrink-0">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg">Q</div>
        </nav>

        {/* 2. Middle Surah Sidebar (Mobile-e Modal, Desktop-e Fixed) */}
        <div className={`
          fixed inset-0 z-50 lg:relative lg:block flex-shrink-0 bg-black/50 lg:bg-transparent transition-opacity
          ${showSurahList ? "opacity-100 visible" : "opacity-0 invisible lg:visible"}
        `} onClick={() => setShowSurahList(false)}>
          <div className={`
            w-80 h-full bg-[#1a1a1a] border-r border-gray-800 transition-transform duration-300
            ${showSurahList ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `} onClick={(e) => e.stopPropagation()}>
            <SurahSidebar />
          </div>
        </div>

        {/* 3. Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#121212] pt-16 lg:pt-0 relative">
          {children}
        </main>

        {/* 4. Right Settings Panel (Mobile-e Right Drawer, Desktop-e Fixed) */}
        <div className={`
          fixed inset-0 z-50 lg:relative lg:block flex-shrink-0 bg-black/50 lg:bg-transparent transition-opacity
          ${showSettings ? "opacity-100 visible" : "opacity-0 invisible lg:visible"}
        `} onClick={() => setShowSettings(false)}>
          <div className={`
            w-80 h-full bg-[#1a1a1a] border-l border-gray-800 ml-auto transition-transform duration-300
            ${showSettings ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
          `} onClick={(e) => e.stopPropagation()}>
            <SettingsPanel />
          </div>
        </div>

      </body>
    </html>
  );
}