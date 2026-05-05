"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Ayah {
    number: number;
    numberInSurah: number;
    text: string;
    translation: string;
}

interface SurahData {
    number: number;
    name: string;
    englishName: string;
    ayahs: Ayah[];
}

// Global player state to prevent overlapping
let currentAudio: HTMLAudioElement | null = null;
let currentPlayingId: number | null = null;

export default function SurahPage() {
    const { id } = useParams();
    const [surah, setSurah] = useState<SurahData | null>(null);
    const [playingId, setPlayingId] = useState<number | null>(null);

    const playAudio = (ayahNumber: number) => {
        // 1. If the SAME ayah is clicked while playing -> PAUSE IT
        if (currentAudio && currentPlayingId === ayahNumber) {
            currentAudio.pause();
            currentAudio = null;
            currentPlayingId = null;
            setPlayingId(null);
            return;
        }

        // 2. If a DIFFERENT ayah is playing -> STOP previous
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        // 3. PLAY the new ayah
        currentAudio = new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNumber}.mp3`);
        currentPlayingId = ayahNumber;
        setPlayingId(ayahNumber);

        currentAudio.play();

        // 4. When audio finishes, reset state
        currentAudio.onended = () => {
            setPlayingId(null);
            currentPlayingId = null;
            currentAudio = null;
        };
    };

    useEffect(() => {
        if (id) {
            fetch(`https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,en.sahih`)
                .then((res) => res.json())
                .then((data) => {
                    const arabic = data.data[0];
                    const english = data.data[1];
                    const combinedAyahs = arabic.ayahs.map((ayah: any, index: number) => ({
                        number: ayah.number,
                        numberInSurah: ayah.numberInSurah,
                        text: ayah.text,
                        translation: english.ayahs[index].text
                    }));
                    setSurah({ ...arabic, ayahs: combinedAyahs });
                });
        }
        // Cleanup on unmount
        return () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }
        };
    }, [id]);

    if (!surah) return <div className="p-10 text-center text-gray-400">Loading Surah Content...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            {/* Header */}
            <div className="text-center mb-8 p-6 bg-[#1a1a1a] rounded-xl border border-gray-800">
                <h1 className="text-3xl md:text-5xl font-bold text-green-500 mb-2 font-serif">{surah.name}</h1>
                <h2 className="text-lg md:text-xl text-gray-400 uppercase tracking-widest">{surah.englishName}</h2>
            </div>

            {/* Ayahs */}
            <div className="space-y-6 mb-20">
                {surah.ayahs.map((ayah) => (
                    <div key={ayah.numberInSurah} className="p-5 md:p-8 bg-[#1a1a1a] rounded-xl border border-gray-800 hover:border-gray-700 transition-all">
                        <div className="flex flex-col space-y-6">
                            <div className="flex justify-between items-start gap-6">
                                <div className="flex items-center space-x-4">
                                    <span className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-xs text-green-500 border border-gray-700">
                                        {ayah.numberInSurah}
                                    </span>
                                    <button
                                        onClick={() => playAudio(ayah.number)}
                                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${playingId === ayah.number ? "bg-green-600 text-white animate-pulse" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                            }`}
                                    >
                                        {playingId === ayah.number ? "⏸" : "▶️"}
                                    </button>
                                </div>
                                <p className="text-3xl md:text-5xl text-right font-serif leading-[1.8] md:leading-[2.2]" dir="rtl">
                                    {ayah.text}
                                </p>
                            </div>
                            <div className="border-t border-gray-800 pt-6">
                                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                    {ayah.translation}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}