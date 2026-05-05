"use client";
import { useState, useEffect } from "react";

export default function SettingsPanel() {
    const [aFont, setAFont] = useState("font-uthmani");
    const [aSize, setASize] = useState(30);
    const [tSize, setTSize] = useState(18);

    useEffect(() => {
        setAFont(localStorage.getItem("quran_font") || "font-uthmani");
        setASize(Number(localStorage.getItem("quran_arabic_size")) || 30);
        setTSize(Number(localStorage.getItem("quran_trans_size")) || 18);
    }, []);

    const update = (key: string, val: any) => {
        localStorage.setItem(key, val.toString());
        window.dispatchEvent(new Event("settings_changed")); // Event pathachchi jate SurahPage instantly update hoy
    };

    return (
        <div className="p-6 space-y-10">
            <h2 className="text-xl font-bold text-green-500 border-b border-gray-800 pb-2 uppercase tracking-widest">Settings</h2>

            {/* Font Selection */}
            <div className="space-y-4">
                <label className="text-sm text-gray-400">Arabic Font</label>
                <select
                    onChange={(e) => { setAFont(e.target.value); update("quran_font", e.target.value); }}
                    className="w-full bg-[#2a2a2a] p-2 rounded outline-none border border-gray-700 text-sm"
                >
                    <option value="font-uthmani">Uthmani</option>
                    <option value="font-amiri">Amiri</option>
                </select>
            </div>

            {/* Arabic Size */}
            <div className="space-y-4">
                <label className="text-sm text-gray-400 flex justify-between">
                    Arabic Size <span>{aSize}px</span>
                </label>
                <input
                    type="range" min="20" max="60" value={aSize}
                    onChange={(e) => { setASize(+e.target.value); update("quran_arabic_size", e.target.value); }}
                    className="w-full h-1 bg-gray-700 rounded-lg accent-green-600 appearance-none cursor-pointer"
                />
            </div>

            {/* Translation Size */}
            <div className="space-y-4">
                <label className="text-sm text-gray-400 flex justify-between">
                    Translation Size <span>{tSize}px</span>
                </label>
                <input
                    type="range" min="14" max="30" value={tSize}
                    onChange={(e) => { setTSize(+e.target.value); update("quran_trans_size", e.target.value); }}
                    className="w-full h-1 bg-gray-700 rounded-lg accent-green-600 appearance-none cursor-pointer"
                />
            </div>
        </div>
    );
}