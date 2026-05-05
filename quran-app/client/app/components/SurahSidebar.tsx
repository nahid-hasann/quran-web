"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Surah {
    number: number;
    name: string;
    englishName: string;
    revelationType: string;
}

export default function SurahSidebar() {
    // Initial state faka array kora hoyeche jate filter error na dey
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
        fetch(`${API_URL}/api/surahs`)
            .then((res) => res.json())
            .then((data) => {
                // Backend array pathale direct set koro, nahole property check koro
                if (Array.isArray(data)) {
                    setSurahs(data);
                } else if (data.data) {
                    setSurahs(data.data);
                }
            })
            .catch(err => console.error("Error fetching surahs:", err));
    }, []);

    const filteredSurahs = (surahs || []).filter((s) =>
        s.englishName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.number?.toString() === searchQuery
    );

    return (
        <div className="h-full flex flex-col bg-[#1a1a1a]">
            <div className="p-4 border-b border-gray-800 sticky top-0 bg-[#1a1a1a] z-10">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search Surah (e.g. Fatiha or 1)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 pl-10 bg-[#2a2a2a] rounded-xl outline-none border border-gray-800 focus:border-green-600 transition-all text-sm"
                    />
                    <span className="absolute left-3 top-3.5 text-gray-500">🔍</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredSurahs.map((s) => (
                    <Link href={`/surah/${s.id || s.number}`} key={s.id || s.number}>
                        <div className="p-4 border-b border-gray-900 hover:bg-[#232323] cursor-pointer flex justify-between items-center group transition-colors">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold text-gray-600 bg-[#2a2a2a] w-8 h-8 flex items-center justify-center rounded-lg group-hover:text-green-500">
                                    {s.id || s.number}
                                </span>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-200">{s.englishName}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{s.revelationType}</p>
                                </div>
                            </div>
                            <p className="text-green-500 font-serif text-lg">{s.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}