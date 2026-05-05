import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import SurahSidebar from "./components/SurahSidebar";
import SettingsPanel from "./components/SettingsPanel";

const inter = Inter({ subsets: ["latin"] });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: '--font-amiri' });

export const metadata: Metadata = { title: "Quran App - Job Task" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${amiri.variable}`}>
      <body className={`${inter.className} bg-[#121212] text-white flex h-screen overflow-hidden`}>

        {/* Desktop Sidebar Icon */}
        <nav className="hidden md:flex w-20 border-r border-gray-800 flex-col items-center py-8 space-y-10 bg-[#1a1a1a] flex-shrink-0">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg">Q</div>
          <div className="text-gray-500 text-2xl">🏠</div>
        </nav>

        {/* Surah List (Visible on all devices) */}
        <div className="w-64 md:w-80 border-r border-gray-800 flex-shrink-0 bg-[#1a1a1a] overflow-y-auto">
          <SurahSidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#121212] relative">
          {children}
        </main>

        {/* Right Settings (Hidden on Mobile) */}
        <div className="hidden lg:block w-80 border-l border-gray-800 flex-shrink-0 bg-[#1a1a1a]">
          <SettingsPanel />
        </div>

      </body>
    </html>
  );
}