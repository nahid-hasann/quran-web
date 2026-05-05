"use client";
import { useState, useEffect } from "react";

export default function SettingsPanel() {
    const [settings, setSettings] = useState({ font: "font-serif", aSize: 30, tSize: 18 });

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
        <div className="p-6 md:p-8 h-full space-y-10 overflow-y-auto">
            <h2 className="text-xl font-bold text-green-500 border-b border-gray-800 pb-4 uppercase tracking-widest">Display Settings</h2>

            {/* 1. Arabic Font Selection (Fixed for Mobile) */}
            <div className="space-y-3">
                <label className="text-xs text-gray-500 block uppercase font-bold">Arabic Font Style</label>
                <div className="relative">
                    <select
                        value={settings.font}
                        onChange={(e) => update("quran_font", e.target.value)}
                        className="w-full bg-[#2a2a2a] p-3 rounded-xl border border-gray-700 outline-none focus:border-green-600 appearance-none text-sm cursor-pointer"
                    >
                        <option value="font-serif">Standard Serif</option>
                        <option value="font-amiri">Amiri (Arabic Style)</option>
                    </select>
                    <span className="absolute right-4 top-3.5 text-gray-500 pointer-events-none">▼</span>
                </div>
            </div>

            {/* 2. Arabic Size Slider */}
            <div className="space-y-4">
                <label className="text-xs text-gray-500 flex justify-between uppercase font-bold">
                    Arabic Size <span>{settings.aSize}px</span>
                </label>
                <input
                    type="range" min="20" max="65" value={settings.aSize}
                    onChange={(e) => update("quran_arabic_size", e.target.value)}
                    className="w-full h-1.5 bg-gray-700 rounded-lg accent-green-600 appearance-none cursor-pointer"
                />
            </div>

            {/* 3. Translation Size Slider */}
            <div className="space-y-4">
                <label className="text-xs text-gray-500 flex justify-between uppercase font-bold">
                    Translation Size <span>{settings.tSize}px</span>
                </label>
                <input
                    type="range" min="14" max="30" value={settings.tSize}
                    onChange={(e) => update("quran_trans_size", e.target.value)}
                    className="w-full h-1.5 bg-gray-700 rounded-lg accent-green-600 appearance-none cursor-pointer"
                />
            </div>

            <div className="border-t border-gray-800 pt-8 mt-10">
                <h3 className="text-green-600 text-xs font-bold uppercase mb-4 tracking-widest">Global Search</h3>
                <p className="text-[10px] text-gray-500 leading-relaxed italic">
                    Coming Soon: Search specific Ayahs using keywords in translation.
                </p>
            </div>
        </div>
    );
}