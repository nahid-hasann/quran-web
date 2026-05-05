import { Database } from "bun:sqlite";

const db = new Database("quran.db", { create: true });

// Table create kora
db.run(`
  CREATE TABLE IF NOT EXISTS surahs (
    id INTEGER PRIMARY KEY,
    name TEXT,
    englishName TEXT,
    revelationType TEXT,
    numberOfAyahs INTEGER
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS ayahs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    surah_id INTEGER,
    numberInSurah INTEGER,
    text TEXT,
    translation TEXT,
    FOREIGN KEY(surah_id) REFERENCES surahs(id)
  );
`);

console.log("Database initialized.");

// Demo data insert
const insertSurah = db.prepare("INSERT OR REPLACE INTO surahs (id, name, englishName, revelationType, numberOfAyahs) VALUES (?, ?, ?, ?, ?)");
insertSurah.run(1, "سُورَةُ الْفَاتِحَةِ", "Al-Faatiha", "Meccan", 7);

const insertAyah = db.prepare("INSERT INTO ayahs (surah_id, numberInSurah, text, translation) VALUES (?, ?, ?, ?)");
insertAyah.run(1, 1, "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "In the name of Allah, the Entirely Merciful, the Especially Merciful.");

console.log("Seed data added successfully!");
db.close();