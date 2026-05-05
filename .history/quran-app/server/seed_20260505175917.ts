import { Database } from "bun:sqlite";

const db = new Database("quran.db", { create: true });

// Table clean kora
db.run("DROP TABLE IF EXISTS surahs");
db.run("DROP TABLE IF EXISTS ayahs");

db.run(`CREATE TABLE surahs (id INTEGER PRIMARY KEY, name TEXT, englishName TEXT, revelationType TEXT, numberOfAyahs INTEGER);`);
db.run(`CREATE TABLE ayahs (id INTEGER PRIMARY KEY AUTOINCREMENT, surah_id INTEGER, numberInSurah INTEGER, text TEXT, translation TEXT);`);

async function seed() {
    console.log("Fetching Quran Data...");
    const arRes = await fetch("https://api.alquran.cloud/v1/quran/quran-uthmani");
    const enRes = await fetch("https://api.alquran.cloud/v1/quran/en.sahih");

    const arData = await arRes.json();
    const enData = await enRes.json();

    const insertSurah = db.prepare("INSERT INTO surahs VALUES (?, ?, ?, ?, ?)");
    const insertAyah = db.prepare("INSERT INTO ayahs (surah_id, numberInSurah, text, translation) VALUES (?, ?, ?, ?)");

    const transaction = db.transaction(() => {
        for (let i = 0; i < 114; i++) {
            const surah = arData.data.surahs[i];
            const enSurah = enData.data.surahs[i];

            insertSurah.run(surah.number, surah.name, surah.englishName, surah.revelationType, surah.ayahs.length);

            for (let j = 0; j < surah.ayahs.length; j++) {
                // Ekhane Arabic text ebong English translation duiti-i insert hocche
                insertAyah.run(surah.number, surah.ayahs[j].numberInSurah, surah.ayahs[j].text, enSurah.ayahs[j].text);
            }
        }
    });

    transaction();
    console.log("✅ Database Seeded with Translations!");
}

seed();