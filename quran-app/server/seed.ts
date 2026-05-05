import { Database } from "bun:sqlite";

const db = new Database("quran.db", { create: true });

db.run(`CREATE TABLE IF NOT EXISTS surahs (id INTEGER PRIMARY KEY, name TEXT, englishName TEXT, revelationType TEXT, numberOfAyahs INTEGER);`);
db.run(`CREATE TABLE IF NOT EXISTS ayahs (id INTEGER PRIMARY KEY AUTOINCREMENT, surah_id INTEGER, numberInSurah INTEGER, text TEXT, translation TEXT, FOREIGN KEY(surah_id) REFERENCES surahs(id));`);

console.log("Fetching Quran data...");

async function seed() {
    try {
        // Arabic text ebong English translation eksathe anchi
        const arRes = await fetch("https://api.alquran.cloud/v1/quran/quran-uthmani");
        const enRes = await fetch("https://api.alquran.cloud/v1/quran/en.sahih");

        const arData = await arRes.json();
        const enData = await enRes.json();

        const insertSurah = db.prepare("INSERT OR REPLACE INTO surahs VALUES (?, ?, ?, ?, ?)");
        const insertAyah = db.prepare("INSERT INTO ayahs (surah_id, numberInSurah, text, translation) VALUES (?, ?, ?, ?)");

        // Batch transaction start (Onek fast hobe)
        const transaction = db.transaction(() => {
            for (let i = 0; i < 114; i++) {
                const surah = arData.data.surahs[i];
                const enSurah = enData.data.surahs[i];

                insertSurah.run(surah.number, surah.name, surah.englishName, surah.revelationType, surah.ayahs.length);

                for (let j = 0; j < surah.ayahs.length; j++) {
                    insertAyah.run(surah.number, surah.ayahs[j].numberInSurah, surah.ayahs[j].text, enSurah.ayahs[j].text);
                }
                console.log(`Seeded: ${surah.englishName}`);
            }
        });

        transaction();
        console.log("✅ 114 Surahs with Arabic & Translation Seeded!");
    } catch (err) {
        console.error("Seed failed:", err);
    } finally {
        db.close();
    }
}

seed();