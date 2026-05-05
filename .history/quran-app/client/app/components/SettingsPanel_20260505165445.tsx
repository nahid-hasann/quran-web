"use client";

export default function SettingsPanel() {
    return (
        <div className="w-72 h-screen border-l border-gray-800 bg-[#1a1a1a] p-6">
            <h2 className="text-xl font-bold mb-6 text-green-500 border-b border-gray-800 pb-2">Settings</h2>

            <div className="space-y-8">
                {/* Font Selector */}
                <div>
                    <label className="block text-sm text-gray-400 mb-3 uppercase tracking-wider">Arabic Font</label>
                    <select className="w-full p-2.5 bg-[#2a2a2a] rounded-lg outline-none border border-gray-700 text-sm focus:border-green-600">
                        <option>Uthmani (Standard)</option>
                        <option>Amiri</option>
                        <option>Lateef</option>
                    </select>
                </div>

                {/* Arabic Size Slider */}
                <div>
                    <label className="block text-sm text-gray-400 mb-3 uppercase tracking-wider">Arabic Size</label>
                    <input
                        type="range" min="20" max="60"
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 mt-2">
                        <span>20px</span>
                        <span>60px</span>
                    </div>
                </div>

                {/* Translation Size Slider */}
                <div>
                    <label className="block text-sm text-gray-400 mb-3 uppercase tracking-wider">Translation Size</label>
                    <input
                        type="range" min="14" max="30"
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 mt-2">
                        <span>14px</span>
                        <span>30px</span>
                    </div>
                </div>
            </div>

            <div className="mt-20 p-4 bg-green-900/10 border border-green-900/20 rounded-lg">
                <p className="text-xs text-green-700 text-center italic">
                    Settings are saved automatically to your device.
                </p>
            </div>
        </div>
    );
}