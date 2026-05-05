"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Ayah {
    numberInSurah: number;
    text: string;
}

interface SurahData {
    number: number;
    name: string;
    englishName: string;
    ayahs: Ayah[];
}

const playAudio = (ayahNumber: number) => {
    // Ayah number format korte hoy 001001 (SurahNumber + AyahNumber)
    // Kintu Alquran.cloud er absolute number use kora tai easy
    const audio = new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNumber}.mp3`);
    audio.play();
  };

export default function SurahPage() {
    const { id } = useParams();
    const [surah, setSurah] = useState<SurahData | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,en.sahih`)
                .then((res) => res.json())
                .then((data) => {
                    // data.data[0] e thakbe Arabic text, data.data[1] e thakbe English translation
                    const arabic = data.data[0];
                    const english = data.data[1];

                    const combinedAyahs = arabic.ayahs.map((ayah: any, index: number) => ({
                        numberInSurah: ayah.numberInSurah,
                        text: ayah.text,
                        translation: english.ayahs[index].text
                    }));

                    setSurah({ ...arabic, ayahs: combinedAyahs });
                });
        }
    }, [id]);

    if (!surah) return <div className="p-10">Loading Surah...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10 p-6 bg-[#1a1a1a] rounded-xl border border-gray-800">
                <h1 className="text-4xl font-bold text-green-500 mb-2">{surah.name}</h1>
                <h2 className="text-xl text-gray-400">{surah.englishName}</h2>
            </div>

            <div className="space-y-8">
                {surah.ayahs.map((ayah: any) => (
                    <div key={ayah.numberInSurah} className="p-6 bg-[#1a1a1a] rounded-xl border border-gray-800">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-3">
                                    <span className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full text-xs text-green-500">
                                        {ayah.numberInSurah}
                                    </span>

                                    <button
                                        onClick={() => playAudio(ayah.number)} // absolute number use korchi
                                        className="p-2 hover:bg-gray-700 rounded-full transition-colors text-xl"
                                        title="Play Ayah"
                                    >
                                        ▶
                                    </button>
                                </div>
                                <p className="text-3xl text-right font-serif leading-loose" dir="rtl">
                                    {ayah.text}
                                </p>
                            </div>
                            <p className="text-3xl text-right font-serif leading-loose" dir="rtl">
                                {ayah.text}
                            </p>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed border-t border-gray-800 pt-4">
                            {ayah.translation}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}