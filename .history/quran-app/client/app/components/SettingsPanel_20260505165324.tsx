"use client";

export default function SettingsPanel() {
    return (
        <div className="w-72 border-l border-gray-800 bg-[#1a1a1a] p-6 hidden lg:block h-screen">
            <h2 className="text-xl font-bold mb-6 text-green-500">Settings</h2>

            <div className="space-y-8">
                <div>
                    <label className="block text-sm text-gray-400 mb-3">Arabic Font</label>
                    <select className="w-full p-2 bg-[#2a2a2a] rounded outline-none border border-gray-700 text-sm">
                        <option>Uthmani</option>
                        <option>Amiri</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-3">Arabic Font Size</label>
                    <input type="range" className="w-full accent-green-600" />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-3">Translation Size</label>
                    <input type="range" className="w-full accent-green-600" />
                </div>
            </div>
        </div>
    );
}