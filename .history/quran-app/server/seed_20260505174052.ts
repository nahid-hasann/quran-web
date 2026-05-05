import { Database } from "bun:sqlite";

const db = new Database("quran.db", { create: true });

db.run(`CREATE TABLE IF NOT EXISTS surahs (id INTEGER PRIMARY KEY, name TEXT, englishName TEXT, revelationType TEXT, numberOfAyahs INTEGER);`);
db.run(`CREATE TABLE IF NOT EXISTS ayahs (id INTEGER PRIMARY KEY AUTOINCREMENT, surah_id INTEGER, numberInSurah INTEGER, text TEXT, translation TEXT, FOREIGN KEY(surah_id) REFERENCES surahs(id));`);

console.log("Fetching Quran data and seeding database...");

async function seed() {
    try {
        const res = await fetch("https://api.alquran.cloud/v1/quran/en.sahih");
        const data = await res.json();

        const insertSurah = db.prepare("INSERT OR REPLACE INTO surahs VALUES (?, ?, ?, ?, ?)");
        const insertAyah = db.prepare("INSERT INTO ayahs (surah_id, numberInSurah, text, translation) VALUES (?, ?, ?, ?)");

        for (const surah of data.data.surahs) {
            insertSurah.run(surah.number, surah.name, surah.englishName, surah.revelationType, surah.ayahs.length);

            // Arabi text anar jonno arekta fetch dorkar hote pare, kintu amra ekhon basic setup-ta korchi
            for (const ayah of surah.ayahs) {
                insertAyah.run(surah.number, ayah.numberInSurah, ayah.text, ayah.text);
            }
            console.log(`Seeded Surah: ${surah.englishName}`);
        }
        console.log("✅ 114 Surahs Seeded Successfully!");
    } catch (err) {
        console.error("Seed failed:", err);
    } finally {
        db.close();
    }
}

seed();