"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

let currentAudio: HTMLAudioElement | null = null;
let currentPlayingId: number | null = null;

export default function SurahPage() {
    const { id } = useParams();
    const [surah, setSurah] = useState<any>(null);
    const [playingId, setPlayingId] = useState<number | null>(null);
    const [settings, setSettings] = useState({ font: "font-serif", aSize: 30, tSize: 18 });

    useEffect(() => {
        const loadSettings = () => {
            setSettings({
                font: localStorage.getItem("quran_font") || "font-serif",
                aSize: Number(localStorage.getItem("quran_arabic_size")) || 30,
                tSize: Number(localStorage.getItem("quran_trans_size")) || 18,
            });
        };
        loadSettings();
        window.addEventListener("settings_changed", loadSettings);
        return () => window.removeEventListener("settings_changed", loadSettings);
    }, []);

    const playAudio = (ayahNumber: number) => {
        if (currentAudio && currentPlayingId === ayahNumber) {
            if (!currentAudio.paused) {
                currentAudio.pause();
                setPlayingId(null);
            } else {
                currentAudio.play();
                setPlayingId(ayahNumber);
            }
            return;
        }
        if (currentAudio) currentAudio.pause();

        // Audio link-e ayahNumber global number hote pare, jodi backend ayahs array-te global number thake
        currentAudio = new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNumber}.mp3`);
        currentPlayingId = ayahNumber;
        setPlayingId(ayahNumber);
        currentAudio.play();
        currentAudio.onended = () => setPlayingId(null);
    };

    useEffect(() => {
        if (id) {
            // Oboshoy backticks use korbe, normal quotes na
            fetch(`http://localhost:5001/api/surah/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setSurah(data); // Ekhon data structure ekdom simple
                })
                .catch(err => console.error("Fetch error:", err));
        }
    }, [id]);

    if (!surah) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-10 pb-20">
            <div className="text-center mb-10 p-10 bg-[#1a1a1a] rounded-3xl border border-gray-800 shadow-xl">
                <h1 className="text-5xl font-bold text-green-500 mb-4">{surah.name}</h1>
                <p className="text-gray-400 uppercase tracking-widest">{surah.englishName}</p>
            </div>

            <div className="space-y-8">
                {surah.ayahs?.map((ayah: any) => (
                    <div key={ayah.id} className="p-8 bg-[#1a1a1a] rounded-2xl border border-gray-800 transition-all">
                        <div className="flex flex-col space-y-10">
                            <div className="flex justify-between items-start gap-6">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="w-10 h-10 flex items-center justify-center bg-green-900/20 rounded-full text-xs text-green-500 border border-green-800/30">
                                        {ayah.numberInSurah}
                                    </span>
                                    <button
                                        onClick={() => playAudio(ayah.id || ayah.number)}
                                        className={`w-14 h-14 flex items-center justify-center rounded-full text-2xl ${playingId === (ayah.id || ayah.number) ? "bg-green-600 text-white" : "bg-gray-800 text-gray-400"}`}
                                    >
                                        {playingId === (ayah.id || ayah.number) ? "⏸" : "▶️"}
                                    </button>
                                </div>
                                <p
                                    className={`text-right leading-loose flex-1 ${settings.font === 'font-amiri' ? 'font-amiri' : 'font-serif'}`}
                                    style={{ fontSize: `${settings.aSize}px` }}
                                    dir="rtl"
                                >
                                    {ayah.text}
                                </p>
                            </div>
                            <p className="text-gray-400 border-t border-gray-800 pt-8" style={{ fontSize: `${settings.tSize}px` }}>
                                {ayah.translation}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}