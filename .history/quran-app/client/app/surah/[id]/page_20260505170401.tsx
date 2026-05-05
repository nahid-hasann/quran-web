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

let currentAudio: HTMLAudioElement | null = null;
let currentPlayingId: number | null = null;

export default function SurahPage() {
    const { id } = useParams();
    const [surah, setSurah] = useState<SurahData | null>(null);
    const [playingId, setPlayingId] = useState<number | null>(null);

    // Settings States
    const [arabicSize, setArabicSize] = useState(30);
    const [translationSize, setTranslationSize] = useState(18);

    // Sync Settings from LocalStorage
    useEffect(() => {
        const updateSettings = () => {
            setArabicSize(Number(localStorage.getItem("arabicSize")) || 30);
            setTranslationSize(Number(localStorage.getItem("translationSize")) || 18);
        };
        updateSettings();
        window.addEventListener("storage_update", updateSettings);
        return () => window.removeEventListener("storage_update", updateSettings);
    }, []);

    const playAudio = (ayahNumber: number) => {
        // RESUME LOGIC
        if (currentAudio && currentPlayingId === ayahNumber) {
            if (!currentAudio.paused) {
                currentAudio.pause(); // Pause
                setPlayingId(null);
            } else {
                currentAudio.play(); // Resume from where it was
                setPlayingId(ayahNumber);
            }
            return;
        }

        // STOP PREVIOUS COMPLETELY IF NEW ONE CLICKED
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }

        currentAudio = new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNumber}.mp3`);
        currentPlayingId = ayahNumber;
        setPlayingId(ayahNumber);
        currentAudio.play();

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
                    const combinedAyahs = data.data[0].ayahs.map((ayah: any, index: number) => ({
                        number: ayah.number,
                        numberInSurah: ayah.numberInSurah,
                        text: ayah.text,
                        translation: data.data[1].ayahs[index].text
                    }));
                    setSurah({ ...data.data[0], ayahs: combinedAyahs });
                });
        }
    }, [id]);

    if (!surah) return <div className="p-10 text-center text-gray-400 font-bold">LOADING SURAH...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 pb-20">
            <div className="text-center mb-8 p-8 bg-[#1a1a1a] rounded-2xl border border-gray-800 shadow-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-green-500 mb-2 font-serif">{surah.name}</h1>
                <p className="text-gray-400 tracking-widest">{surah.englishName} | {surah.revelationType}</p>
            </div>

            <div className="space-y-6">
                {surah.ayahs.map((ayah) => (
                    <div key={ayah.numberInSurah} className="p-6 md:p-10 bg-[#1a1a1a] rounded-2xl border border-gray-800 hover:border-green-900/30 transition-all">
                        <div className="flex flex-col space-y-8">
                            <div className="flex justify-between items-center gap-6">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="w-10 h-10 flex items-center justify-center bg-green-900/20 rounded-full text-xs text-green-500 border border-green-800/30 font-bold">
                                        {ayah.numberInSurah}
                                    </span>
                                    <button
                                        onClick={() => playAudio(ayah.number)}
                                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all shadow-lg ${playingId === ayah.number ? "bg-green-600 text-white scale-110" : "bg-gray-800 text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        {playingId === ayah.number ? "⏸" : "▶️"}
                                    </button>
                                </div>
                                <p
                                    className="text-right leading-loose font-serif flex-1"
                                    style={{ fontSize: `${arabicSize}px` }}
                                    dir="rtl"
                                >
                                    {ayah.text}
                                </p>
                            </div>
                            <p
                                className="text-gray-300 border-t border-gray-800 pt-6 font-light italic"
                                style={{ fontSize: `${translationSize}px` }}
                            >
                                {ayah.translation}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}