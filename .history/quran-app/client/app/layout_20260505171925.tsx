"use client";
import { useState } from "react";
import { Inter, Amiri } from "next/font/google";
import Link from "next/link"; // Link import koro
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

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1a1a1a] border-b border-gray-800 flex items-center justify-between px-4 z-50">
          <button onClick={() => setShowSurahList(true)} className="p-2 text-green-500 font-bold">☰ Surah</button>
          <Link href="/" className="font-bold text-green-500">Quran App</Link>
          <button onClick={() => setShowSettings(true)} className="p-2 text-green-500 text-xl">⚙️</button>
        </div>

        {/* 1. Desktop Icon Sidebar (Cleanup) */}
        <nav className="hidden lg:flex w-20 border-r border-gray-800 flex-col items-center py-8 space-y-8 bg-[#1a1a1a] flex-shrink-0">
          <Link href="/">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg cursor-pointer hover:bg-green-700 transition-all">Q</div>
          </Link>
          {/* Sudhu Home icon-ta rakhlam jate click korle home-e jay */}
          <Link href="/">
            <div className="text-gray-500 text-2xl cursor-pointer hover:text-white transition-colors">🏠</div>
          </Link>
        </nav>

        {/* 2. Surah Sidebar */}
        <div className={`fixed inset-0 z-[60] lg:relative lg:block lg:z-0 ${showSurahList ? "visible" : "invisible lg:visible"}`}>
          <div className={`absolute inset-0 bg-black/70 lg:hidden transition-opacity ${showSurahList ? "opacity-100" : "opacity-0"}`} onClick={() => setShowSurahList(false)} />
          <div className={`w-80 h-full bg-[#1a1a1a] border-r border-gray-800 transition-transform duration-300 lg:translate-x-0 ${showSurahList ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="lg:hidden p-4 border-b border-gray-800 flex justify-between">
              <span className="text-green-500 font-bold uppercase text-xs tracking-widest">Surah List</span>
              <button onClick={() => setShowSurahList(false)} className="text-xl">✕</button>
            </div>
            <div className="h-full overflow-y-auto" onClick={() => setShowSurahList(false)}>
              <SurahSidebar />
            </div>
          </div>
        </div>

        {/* 3. Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#121212] pt-16 lg:pt-0 scroll-smooth">
          {children}
        </main>

        {/* 4. Settings Panel */}
        <div className={`fixed inset-0 z-[60] lg:relative lg:block lg:z-0 ${showSettings ? "visible" : "invisible lg:visible"}`}>
          <div className={`absolute inset-0 bg-black/70 lg:hidden transition-opacity ${showSettings ? "opacity-100" : "opacity-0"}`} onClick={() => setShowSettings(false)} />
          <div className={`w-80 h-full bg-[#1a1a1a] border-l border-gray-800 transition-transform duration-300 lg:translate-x-0 ml-auto ${showSettings ? "translate-x-0" : "translate-x-full"}`}>
            <div className="lg:hidden p-4 border-b border-gray-800 flex justify-between">
              <span className="text-green-500 font-bold uppercase text-xs tracking-widest">Settings</span>
              <button onClick={() => setShowSettings(false)} className="text-xl">✕</button>
            </div>
            <div className="h-full overflow-y-auto">
              <SettingsPanel />
            </div>
          </div>
        </div>

      </body>
    </html>
  );
}