"use client";
import { useState, useEffect } from "react";

export default function SettingsPanel() {
    const [font, setFont] = useState("font-serif");
    const [aSize, setASize] = useState(30);
    const [tSize, setTSize] = useState(18);

    useEffect(() => {
        setFont(localStorage.getItem("quran_font") || "font-serif");
        setASize(Number(localStorage.getItem("quran_arabic_size")) || 30);
        setTSize(Number(localStorage.getItem("quran_trans_size")) || 18);
    }, []);

    const update = (key: string, val: any) => {
        localStorage.setItem(key, val.toString());
        if (key === "quran_font") setFont(val);
        if (key === "quran_arabic_size") setASize(val);
        if (key === "quran_trans_size") setTSize(val);
        window.dispatchEvent(new Event("settings_changed"));
    };

    return (
        <div className="p-6 space-y-8">
            <h2 className="text-xl font-bold text-green-500 border-b border-gray-800 pb-2">Settings</h2>

            <div>
                <label className="text-xs text-gray-500 block mb-2 uppercase">Arabic Font</label>
                <select value={font} onChange={(e) => update("quran_font", e.target.value)} className="w-full bg-[#2a2a2a] p-2 rounded outline-none border border-gray-700">
                    <option value="font-serif">Standard Serif</option>
                    <option value="font-amiri">Amiri (Arabic Font)</option>
                </select>
            </div>

            <div>
                <label className="text-xs text-gray-500 block mb-2 uppercase">Arabic Size ({aSize}px)</label>
                <input type="range" min="20" max="70" value={aSize} onChange={(e) => update("quran_arabic_size", e.target.value)} className="w-full accent-green-600" />
            </div>

            <div>
                <label className="text-xs text-gray-500 block mb-2 uppercase">Translation Size ({tSize}px)</label>
                <input type="range" min="14" max="30" value={tSize} onChange={(e) => update("quran_trans_size", e.target.value)} className="w-full accent-green-600" />
            </div>
        </div>
    );
}