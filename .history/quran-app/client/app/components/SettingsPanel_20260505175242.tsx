"use client";
import { useState, useEffect, useRef } from "react";

export default function SettingsPanel() {
    const [settings, setSettings] = useState({ font: "font-serif", aSize: 30, tSize: 18 });
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSettings({
            font: localStorage.getItem("quran_font") || "font-serif",
            aSize: Number(localStorage.getItem("quran_arabic_size")) || 30,
            tSize: Number(localStorage.getItem("quran_trans_size")) || 18,
        });

        // Baire click korle dropdown bondho hobe
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
        setSettings(prev => ({ ...prev, [key === "quran_font" ? "font" : key === "quran_arabic_size" ? "aSize" : "tSize"]: val }));
        window.dispatchEvent(new Event("settings_changed"));
    };

    const fontOptions = [
        { label: "Standard Serif", value: "font-serif" },
        { label: "Amiri Font (Classic)", value: "font-amiri" }
    ];

    return (
        <div className="p-5 md:p-8 h-full space-y-10 overflow-x-hidden bg-[#1a1a1a]">
            <h2 className="text-xl font-bold text-green-500 border-b border-gray-800 pb-4 uppercase tracking-tighter">Display Settings</h2>

            {/* Arabic Font - Custom Dropdown Fix */}
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

            {/* Arabic Size */}
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

            {/* Translation Size */}
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

            <div className="border-t border-gray-800 pt-8">
                <h3 className="text-green-600 text-[10px] font-bold uppercase mb-4 tracking-widest">Search Ayah</h3>
                <input
                    type="text"
                    placeholder="Keyword... (e.g. 'Merciful')"
                    className="w-full bg-[#222] p-3 rounded-xl border border-gray-800 text-xs focus:border-green-600 outline-none transition-all"
                />
            </div>
        </div>
    );
}