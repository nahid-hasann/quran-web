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
        const newSettings = { ...settings, [key === "quran_font" ? "font" : key === "quran_arabic_size" ? "aSize" : "tSize"]: val };
        setSettings(newSettings as any);
        window.dispatchEvent(new Event("settings_changed"));
    };

    return (
        <div className="p-8 h-full space-y-10">
            <h2 className="text-xl font-bold text-green-500 border-b border-gray-800 pb-4">Display Settings</h2>

            <div>
                <label className="text-xs text-gray-500 block mb-3 uppercase">Arabic Font</label>
                <select value={settings.font} onChange={(e) => update("quran_font", e.target.value)} className="w-full bg-[#2a2a2a] p-3 rounded-lg border border-gray-700 outline-none focus:border-green-600 transition-all">
                    <option value="font-serif">Standard Serif</option>
                    <option value="font-amiri">Amiri Font (Classic)</option>
                </select>
            </div>

            <div>
                <label className="text-xs text-gray-500 flex justify-between mb-3 uppercase">Arabic Size <span>{settings.aSize}px</span></label>
                <input type="range" min="20" max="70" value={settings.aSize} onChange={(e) => update("quran_arabic_size", e.target.value)} className="w-full h-1 bg-gray-700 rounded-lg accent-green-600 appearance-none cursor-pointer" />
            </div>

            <div>
                <label className="text-xs text-gray-500 flex justify-between mb-3 uppercase">Translation Size <span>{settings.tSize}px</span></label>
                <input type="range" min="14" max="30" value={settings.tSize} onChange={(e) => update("quran_trans_size", e.target.value)} className="w-full h-1 bg-gray-700 rounded-lg accent-green-600 appearance-none cursor-pointer" />
            </div>
        </div>
    );
}