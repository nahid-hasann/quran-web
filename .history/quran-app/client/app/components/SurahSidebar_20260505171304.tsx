"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SurahSidebar() {
    const [surahs, setSurahs] = useState<any[]>([]);

    useEffect(() => {
        fetch("https://api.alquran.cloud/v1/surah")
            .then((res) => res.json())
            .then((data) => setSurahs(data.data));
    }, []);

    return (
        <div className="h-full flex flex-col bg-[#1a1a1a]">
            <div className="p-4 border-b border-gray-800">
                <input type="text" placeholder="Search Surah..." className="w-full p-2 bg-[#2a2a2a] rounded outline-none border border-gray-800 focus:border-green-600" />
            </div>
            <div className="flex-1 overflow-y-auto">
                {surahs.map((s) => (
                    <Link href={`/surah/${s.number}`} key={s.number}>
                        <div className="p-4 border-b border-gray-900 hover:bg-[#2a2a2a] cursor-pointer flex justify-between items-center transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-500 w-6">{s.number}</span>
                                <div>
                                    <h4 className="text-sm font-medium">{s.englishName}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase">{s.revelationType}</p>
                                </div>
                            </div>
                            <p className="text-green-500 font-serif">{s.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}