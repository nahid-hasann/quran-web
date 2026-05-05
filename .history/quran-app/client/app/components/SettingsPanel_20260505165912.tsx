"use client";
import { useState, useEffect } from "react";

export default function SettingsPanel() {
    const [aSize, setASize] = useState(30);
    const [tSize, setTSize] = useState(18);

    useEffect(() => {
        setASize(Number(localStorage.getItem("arabicSize")) || 30);
        setTSize(Number(localStorage.getItem("translationSize")) || 18);
    }, []);

    const update = (key: string, val: number) => {
        localStorage.setItem(key, val.toString());
        key === "arabicSize" ? setASize(val) : setTSize(val);
        window.dispatchEvent(new Event("storage_update")); // Trigger update in SurahPage
    };

    return (
        <div className="w-80 h-screen border-l border-gray-800 bg-[#1a1a1a] p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-10 text-green-500 border-b border-gray-800 pb-4">Settings</h2>
            <div className="space-y-12">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-4 uppercase tracking-tighter">Arabic Font Size ({aSize}px)</label>
                    <input type="range" min="20" max="70" value={aSize} onChange={(e) => update("arabicSize", +e.target.value)} className="w-full h-1 bg-gray-700 rounded-lg accent-green-600 appearance-none cursor-pointer" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-4 uppercase tracking-tighter">Translation Size ({tSize}px)</label>
                    <input type="range" min="12" max="40" value={tSize} onChange={(e) => update("translationSize", +e.target.value)} className="w-full h-1 bg-gray-700 rounded-lg accent-green-600 appearance-none cursor-pointer" />
                </div>
            </div>
        </div>
    );
}