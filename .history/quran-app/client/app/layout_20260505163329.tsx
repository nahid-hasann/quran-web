import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quran App",
  description: "Job Assessment Task",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#121212] text-white flex h-screen`}>

        <nav className="w-16 border-r border-gray-800 flex flex-col items-center py-4 space-y-8 bg-[#1a1a1a]">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">Q</div>
          <div className="text-gray-400">🏠</div>
          <div className="text-gray-400">📖</div>
          <div className="text-gray-400">⚙️</div>
        </nav>


        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}