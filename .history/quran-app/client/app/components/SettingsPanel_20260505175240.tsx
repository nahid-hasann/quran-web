"use client";
import { useState, useEffect, useRef } from "react";

export default function SettingsPanel() {
  const [settings, setSettings] = useState({ font: "font-serif", aSize: 30, tSize: 18 });
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 2) {
        fetch(`http://localhost:5001/api/search?q=${searchQuery}`)
          .then(res => res.json())
          .then(data => setSearchResults(data));
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Previous settings logic
  useEffect(() => {
    setSettings({
      font: localStorage.getItem("quran_font") || "font-serif",
      aSize: Number(localStorage.getItem("quran_arabic_size")) || 30,
      tSize: Number(localStorage.getItem("quran_trans_size")) || 18,
    });
  }, []);

  const update = (key: string, val: any) => {
    localStorage.setItem(key, val.toString());
    setSettings(prev => ({ ...prev, [key === "quran_font" ? "font" : key === "quran_arabic_size" ? "aSize" : "tSize"]: val }));
    window.dispatchEvent(new Event("settings_changed"));
  };

  return (
    <div className="p-5 md:p-8 h-full space-y-10 overflow-x-hidden bg-[#1a1a1a]">
      <h2 className="text-xl font-bold text-green-500 border-b border-gray-800 pb-4 uppercase tracking-tighter">Display Settings</h2>
      
      {/* Font & Sliders (Ager moto thakbe) */}
      <div className="space-y-4">
        {/* ... font dropdown and sliders code from previous fix ... */}
      </div>

      <div className="border-t border-gray-800 pt-8">
        <h3 className="text-green-600 text-[10px] font-bold uppercase mb-4 tracking-widest">Global Ayah Search</h3>
        <input 
          type="text" 
          placeholder="Search translation... (e.g. 'Merciful')" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#222] p-3 rounded-xl border border-gray-800 text-xs focus:border-green-600 outline-none transition-all"
        />

        {/* Search Results Display */}
        <div className="mt-4 space-y-3">
          {searchResults.map((res, index) => (
            <div key={index} className="p-3 bg-[#252525] rounded-lg border border-gray-800 text-[10px]">
               <p className="text-green-500 font-bold mb-1">Surah {res.surah_id}:{res.numberInSurah}</p>
               <p className="text-gray-300 italic">"{res.translation.substring(0, 80)}..."</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}