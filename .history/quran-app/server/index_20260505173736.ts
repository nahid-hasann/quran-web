import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import Database from 'better-sqlite3';

const app = new Hono();
const db = new Database('quran.db');

// Frontend theke access korar jonno CORS on kora
app.use('/api/*', cors());

// Sob Surah pawar API
app.get('/api/surahs', (c) => {
    const surahs = db.prepare('SELECT * FROM surahs').all();
    return c.json(surahs);
});

// Specific Surah details (Ayahs shoho)
app.get('/api/surah/:id', (c) => {
    const id = c.req.param('id');
    const surah = db.prepare('SELECT * FROM surahs WHERE id = ?').get(id);
    const ayahs = db.prepare('SELECT * FROM ayahs WHERE surah_id = ?').all(id);

    if (!surah) return c.json({ error: "Surah not found" }, 404);
    return c.json({ ...surah, ayahs });
});

// Ayah Search (Translation diye khujar jonno)
app.get('/api/search', (c) => {
    const query = c.req.query('q');
    if (!query) return c.json([]);
    const results = db.prepare('SELECT * FROM ayahs WHERE translation LIKE ? LIMIT 20')
        .all(`%${query}%`);
    return c.json(results);
});

console.log("Server is running on http://localhost:5000");
serve({ fetch: app.fetch, port: 5000 });