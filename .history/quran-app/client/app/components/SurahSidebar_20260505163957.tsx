"use client";
import { useEffect, useState } from "react";

interface Surah {
    number: number;
    name: string;
    englishName: string;
}

export default function SurahSidebar() {
    const [surahs, setSurahs] = useState<Surah[]>([]);

    useEffect(() => {
        // Alquran.cloud theke directly fetch korchi
        fetch("https://api.alquran.cloud/v1/surah")
            .then((res) => res.json())
            .then((data) => setSurahs(data.data));
    }, []);

    return (
        <div className="w-80 h-screen border-r border-gray-800 bg-[#1a1a1a] overflow-y-auto hidden md:block">
            <div className="p-4 border-b border-gray-800">
                <input
                    type="text"
                    placeholder="Search Surah..."
                    className="w-full p-2 bg-[#2a2a2a] rounded text-sm outline-none focus:ring-1 ring-green-600"
                />
            </div>
            <div className="flex flex-col">
                {surahs.map((surah) => (
                    <Link href={`/surah/${surah.number}`} key={surah.number}></Link>
                    <div
                        key={surah.number}
                        className="flex items-center p-4 hover:bg-[#2a2a2a] cursor-pointer border-b border-gray-900 transition-colors"
                    >
                        <div className="w-8 h-8 bg-[#2a2a2a] rounded flex items-center justify-center text-xs mr-3 text-gray-400">
                            {surah.number}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium">{surah.englishName}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-arabic text-green-500">{surah.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}