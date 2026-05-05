import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import Database from 'better-sqlite3';

const app = new Hono();
const db = new Database('quran.db');

// Sob Surah list pawar API
app.get('/api/surahs', (c) => {
    const surahs = db.prepare('SELECT * FROM surahs').all();
    return c.json(surahs);
});

// Specific Surah details (Ayahs-shoho)
app.get('/api/surah/:id', (c) => {
    const id = c.req.param('id');
    const surah = db.prepare('SELECT * FROM surahs WHERE id = ?').get(id);
    const ayahs = db.prepare('SELECT * FROM ayahs WHERE surah_id = ?').all(id);

    return c.json({ ...surah, ayahs });
});

// Ayah Search (Job Task-er requirement)
app.get('/api/search', (c) => {
    const query = c.req.query('q');
    const results = db.prepare('SELECT * FROM ayahs WHERE translation LIKE ? LIMIT 20')
        .all(`%${query}%`);
    return c.json(results);
});

console.log("Server running on http://localhost:5000");
serve({ fetch: app.fetch, port: 5000 });