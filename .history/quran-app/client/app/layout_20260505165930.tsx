import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SurahSidebar from "./components/SurahSidebar";
import SettingsPanel from "./components/SettingsPanel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { title: "Quran App - Job Task" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#121212] text-white flex h-screen overflow-hidden`}>

        {/* Left Icon Bar (Hidden on tiny phones to save space) */}
        <nav className="hidden xs:flex w-16 md:w-20 border-r border-gray-800 flex-col items-center py-8 space-y-10 bg-[#1a1a1a] flex-shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">Q</div>
        </nav>

        {/* Surah List (Scrollable on ALL devices, but narrower on mobile) */}
        <div className="w-full sm:w-64 md:w-80 border-r border-gray-800 flex-shrink-0 bg-[#1a1a1a]">
          <SurahSidebar />
        </div>

        {/* Main Content (On mobile, this will scroll horizontally or you can click surahs to open) */}
        <main className="flex-1 overflow-y-auto bg-[#121212] scroll-smooth">
          {children}
        </main>

        {/* Settings Panel (Visible only on Desktops) */}
        <div className="hidden xl:block">
          <SettingsPanel />
        </div>

      </body>
    </html>
  );
}