"use client";
import { useState, useEffect } from "react";

export default function SettingsPanel() {
    const [arabicSize, setArabicSize] = useState(30);
    const [translationSize, setTranslationSize] = useState(18);

    useEffect(() => {
        // Load saved settings
        const savedArabic = localStorage.getItem("arabicSize");
        const savedTrans = localStorage.getItem("translationSize");
        if (savedArabic) setArabicSize(parseInt(savedArabic));
        if (savedTrans) setTranslationSize(parseInt(savedTrans));
    }, []);

    const handleArabicChange = (val: number) => {
        setArabicSize(val);
        localStorage.setItem("arabicSize", val.toString());
        window.dispatchEvent(new Event("storage")); // Custom event to update other components
    };

    return (
        <div className="w-72 border-l border-gray-800 bg-[#1a1a1a] p-6 hidden lg:block">
            <h2 className="text-xl font-bold mb-6">Settings</h2>

            <div className="mb-8">
                <label className="block text-sm text-gray-400 mb-3">Arabic Font Size ({arabicSize}px)</label>
                <input
                    type="range" min="20" max="60"
                    value={arabicSize}
                    onChange={(e) => handleArabicChange(parseInt(e.target.value))}
                    className="w-full accent-green-600"
                />
            </div>

            <div className="mb-8">
                <label className="block text-sm text-gray-400 mb-3">Translation Size ({translationSize}px)</label>
                <input
                    type="range" min="14" max="30"
                    value={translationSize}
                    onChange={(e) => {
                        setTranslationSize(parseInt(e.target.value));
                        localStorage.setItem("translationSize", e.target.value);
                        window.dispatchEvent(new Event("storage"));
                    }}
                    className="w-full accent-green-600"
                />
            </div>
        </div>
    );
}