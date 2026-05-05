"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Ayah {
    number: number; // Absolute number for audio
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

export default function SurahPage() {
    const { id } = useParams();
    const [surah, setSurah] = useState<SurahData | null>(null);

    const playAudio = (ayahNumber: number) => {
        const audio = new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNumber}.mp3`);
        audio.play();
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
    }, [id]);

    if (!surah) return <div className="p-10 text-center">Loading Surah...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            {/* Surah Header */}
            <div className="text-center mb-8 p-6 bg-[#1a1a1a] rounded-xl border border-gray-800">
                <h1 className="text-3xl md:text-5xl font-bold text-green-500 mb-2">{surah.name}</h1>
                <h2 className="text-lg md:text-xl text-gray-400">{surah.englishName}</h2>
            </div>

            {/* Ayah List */}
            <div className="space-y-6">
                {surah.ayahs.map((ayah) => (
                    <div key={ayah.numberInSurah} className="p-5 md:p-8 bg-[#1a1a1a] rounded-xl border border-gray-800">
                        <div className="flex flex-col space-y-4">

                            {/* Top Row: Number, Audio, and Arabic Text */}
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex items-center space-x-2">
                                    <span className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full text-[10px] text-green-500 border border-gray-700">
                                        {ayah.numberInSurah}
                                    </span>
                                    <button
                                        onClick={() => playAudio(ayah.number)}
                                        className="p-2 hover:bg-gray-800 rounded-full transition-all active:scale-90"
                                    >
                                        ▶️
                                    </button>
                                </div>

                                <p className="text-2xl md:text-4xl text-right font-serif leading-[2.5] md:leading-[3]" dir="rtl">
                                    {ayah.text}
                                </p>
                            </div>

                            {/* Translation Row */}
                            <div className="border-t border-gray-800 pt-5">
                                <p className="text-gray-300 text-base md:text-lg leading-relaxed italic">
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