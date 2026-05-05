"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";

export default function SurahPage() {
    const { id } = useParams();
    const [surah, setSurah] = useState<any>(null);
    const [playingId, setPlayingId] = useState<number | null>(null);
    const [settings, setSettings] = useState({ font: "font-serif", aSize: 30, tSize: 18 });

    // Audio handle korar jonno Ref use kora hoyeche jate component re-render holeo audio haray na
    const audioRef = useRef<HTMLAudioElement | null>(null);

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

    // ⬇️ AUTO-PLAY LOGIC ⬇️
    const playAudio = (index: number) => {
        const ayah = surah.ayahs[index];
        if (!ayah) {
            setPlayingId(null);
            return;
        }

        // Jodi same ayah-te click kore, tahole toggle play/pause
        if (audioRef.current && playingId === ayah.id) {
            if (!audioRef.current.paused) {
                audioRef.current.pause();
                setPlayingId(null);
            } else {
                audioRef.current.play();
                setPlayingId(ayah.id);
            }
            return;
        }

        // Notun audio start kora
        if (audioRef.current) {
            audioRef.current.pause();
        }

        // Global Ayah ID use kora hoyeche audio-r jonno
        const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.id || (surah.id * 7 + ayah.numberInSurah)}.mp3`;
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        setPlayingId(ayah.id);
        audio.play();

        // Jokhon audio shesh hobe
        audio.onended = () => {
            if (index + 1 < surah.ayahs.length) {
                // Next ayah play koro
                playAudio(index + 1);
            } else {
                setPlayingId(null);
            }
        };
    };

    useEffect(() => {
        if (id) {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
            // ⚠️ Eikhane /api/surahs chilo, oitake /api/surah/${id} korte hobe
            fetch(`${API_URL}/api/surah/${id}`)
                .then((res) => res.json())
                .then((data) => setSurah(data))
                .catch(err => console.error("Fetch error:", err));
        }
        return () => {
            if (audioRef.current) audioRef.current.pause();
        };
    }, [id]);

    if (!surah) return <div className="p-10 text-center text-gray-500">Loading Surah...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-10 pb-20">
            <div className="text-center mb-10 p-10 bg-[#1a1a1a] rounded-3xl border border-gray-800 shadow-xl">
                <h1 className="text-5xl font-bold text-green-500 mb-4">{surah.name}</h1>
                <p className="text-gray-400 uppercase tracking-widest">{surah.englishName}</p>
            </div>

            <div className="space-y-8">
                {surah.ayahs?.map((ayah: any, index: number) => (
                    <div
                        key={ayah.id}
                        id={`ayah-${ayah.id}`}
                        className={`p-8 bg-[#1a1a1a] rounded-2xl border transition-all duration-500 ${playingId === ayah.id ? "border-green-600 bg-green-900/5 shadow-[0_0_20px_rgba(22,163,74,0.1)]" : "border-gray-800"}`}
                    >
                        <div className="flex flex-col space-y-10">
                            <div className="flex justify-between items-start gap-6">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="w-10 h-10 flex items-center justify-center bg-green-900/20 rounded-full text-xs text-green-500 border border-green-800/30">
                                        {ayah.numberInSurah}
                                    </span>
                                    <button
                                        onClick={() => playAudio(index)}
                                        className={`w-14 h-14 flex items-center justify-center rounded-full text-2xl transition-all active:scale-90 ${playingId === ayah.id ? "bg-green-600 text-white shadow-lg" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
                                    >
                                        {playingId === ayah.id ? "⏸" : "▶️"}
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