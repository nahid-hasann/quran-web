// Component-er bhitore ei state-gulo add koro
const [settings, setSettings] = useState({ font: "font-uthmani", aSize: 30, tSize: 18 });

useEffect(() => {
    const loadSettings = () => {
        setSettings({
            font: localStorage.getItem("quran_font") || "font-uthmani",
            aSize: Number(localStorage.getItem("quran_arabic_size")) || 30,
            tSize: Number(localStorage.getItem("quran_trans_size")) || 18,
        });
    };
    loadSettings();
    window.addEventListener("settings_changed", loadSettings);
    return () => window.removeEventListener("settings_changed", loadSettings);
}, []);

// Return-er bhitore style use koro eivabe:
<p 
  className={`text-right leading-loose ${settings.font}`} 
  style={{ fontSize: `${settings.aSize}px` }} 
  dir="rtl"
>
  {ayah.text}
</p>
<p 
  className="text-gray-400 border-t border-gray-800 pt-4" 
  style={{ fontSize: `${settings.tSize}px` }}
>
  {ayah.translation}
</p>