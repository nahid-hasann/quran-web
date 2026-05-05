import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Database } from "bun:sqlite";
import { handle } from 'hono/vercel';

const app = new Hono();
const db = new Database("quran.db");

app.use('/api/*', cors());

// Sob Surah list
app.get('/api/surahs', (c) => {
    const surahs = db.query('SELECT * FROM surahs').all();
    return c.json(surahs);
});

// Specific Surah details
app.get('/api/surah/:id', (c) => {
    const id = c.req.param('id');
    const surah = db.query('SELECT * FROM surahs WHERE id = ?').get(id);
    const ayahs = db.query('SELECT * FROM ayahs WHERE surah_id = ?').all(id);

    if (!surah) return c.json({ error: "Surah not found" }, 404);
    return c.json({ ...surah as object, ayahs });
});

// Search API
// Search API Fix
app.get('/api/search', (c) => {
    const query = c.req.query('q');
    if (!query || query.length < 2) return c.json([]); // Khub choto query block kora

    // Bun:sqlite-e query parameter eivabe dile shubidha
    const results = db.query('SELECT * FROM ayahs WHERE translation LIKE ? LIMIT 20')
        .all(`%${query}%`);

    return c.json(results);
});

console.log("Bun Hono Server is running on http://localhost:5000");

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export default {
    port: 5001,
    fetch: app.fetch,
};

