"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SettingsPanel() {
    const [settings, setSettings] = useState({ font: "font-serif", aSize: 30, tSize: 18 });
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Ayah Search Logic with Debounce
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.length > 2) {
                fetch(`http://localhost:5001/api/search?q=${searchQuery}`)
                    .then(res => res.json())
                    .then(data => setSearchResults(data))
                    .catch(err => console.error("Search error:", err));
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    useEffect(() => {
        const loadSettings = () => {
            setSettings({
                font: localStorage.getItem("quran_font") || "font-serif",
                aSize: Number(localStorage.getItem("quran_arabic_size")) || 30,
                tSize: Number(localStorage.getItem("quran_trans_size")) || 18,
            });
        };
        loadSettings();

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const update = (key: string, val: any) => {
        localStorage.setItem(key, val.toString());
        setSettings(prev => ({
            ...prev,
            [key === "quran_font" ? "font" : key === "quran_arabic_size" ? "aSize" : "tSize"]: val
        }));
        window.dispatchEvent(new Event("settings_changed"));
    };

    const fontOptions = [
        { label: "Standard Serif", value: "font-serif" },
        { label: "Amiri Font (Classic)", value: "font-amiri" }
    ];

    return (
        <div className="p-5 md:p-8 h-full space-y-10 overflow-y-auto bg-[#1a1a1a] custom-scrollbar">
            <h2 className="text-xl font-bold text-green-500 border-b border-gray-800 pb-4 uppercase tracking-tighter">Display Settings</h2>

            {/* Arabic Font - Custom Dropdown */}
            <div className="space-y-3 relative" ref={dropdownRef}>
                <label className="text-[10px] text-gray-500 block uppercase font-bold tracking-widest">Arabic Font Style</label>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full bg-[#2a2a2a] p-3 rounded-xl border border-gray-700 text-left text-sm flex justify-between items-center"
                >
                    {fontOptions.find(opt => opt.value === settings.font)?.label}
                    <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#2a2a2a] border border-gray-700 rounded-xl shadow-2xl z-[100] overflow-hidden">
                        {fontOptions.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => {
                                    update("quran_font", opt.value);
                                    setIsOpen(false);
                                }}
                                className={`p-3 text-sm cursor-pointer hover:bg-green-600/20 transition-colors ${settings.font === opt.value ? 'text-green-500 bg-green-900/10' : ''}`}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Arabic Size Slider */}
            <div className="space-y-4">
                <label className="text-[10px] text-gray-500 flex justify-between uppercase font-bold tracking-widest">
                    Arabic Size <span>{settings.aSize}px</span>
                </label>
                <input
                    type="range" min="20" max="65" value={settings.aSize}
                    onChange={(e) => update("quran_arabic_size", e.target.value)}
                    className="w-full h-1 bg-gray-700 rounded-lg accent-green-600 appearance-none cursor-pointer"
                />
            </div>

            {/* Translation Size Slider */}
            <div className="space-y-4">
                <label className="text-[10px] text-gray-500 flex justify-between uppercase font-bold tracking-widest">
                    Translation Size <span>{settings.tSize}px</span>
                </label>
                <input
                    type="range" min="14" max="30" value={settings.tSize}
                    onChange={(e) => update("quran_trans_size", e.target.value)}
                    className="w-full h-1 bg-gray-700 rounded-lg accent-green-600 appearance-none cursor-pointer"
                />
            </div>

            {/* Global Ayah Search */}
            <div className="border-t border-gray-800 pt-8 pb-10">
                <h3 className="text-green-600 text-[10px] font-bold uppercase mb-4 tracking-widest">Search Ayah</h3>
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search translation..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#222] p-3 rounded-xl border border-gray-800 text-xs focus:border-green-600 outline-none transition-all"
                    />
                    {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-2.5 text-gray-500">✕</button>}
                </div>

                {/* Search Results */}
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {searchResults.map((res, i) => (
                        <Link key={i} href={`/surah/${res.surah_id}`} onClick={() => setSearchQuery("")}>
                            <div className="p-3 bg-[#232323] rounded-lg border border-gray-800 hover:border-green-900/50 transition-all cursor-pointer group">
                                <p className="text-[9px] text-green-500 font-bold mb-1">SURAH {res.surah_id} : AYAH {res.numberInSurah}</p>
                                <p className="text-gray-400 text-[10px] line-clamp-2 leading-relaxed group-hover:text-gray-200">
                                    {res.translation}
                                </p>
                            </div>
                        </Link>
                    ))}
                    {searchQuery.length > 2 && searchResults.length === 0 && (
                        <p className="text-[10px] text-gray-600 text-center py-4">No ayahs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}