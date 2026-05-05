import { Hono } from 'hono';
import { cors } from 'hono/cors';
import Database from 'better-sqlite3'; // Eita update koro
import { handle } from 'hono/vercel';
import path from 'path';
import fs from 'fs';

const app = new Hono();

// Vercel-er path handling ektu alada hoy
const dbPath = path.resolve(process.cwd(), 'quran.db');

// Database connection logic
const db = new Database(dbPath, { readonly: true });

app.use('/api/*', cors());

// Sob Surah list
app.get('/api/surahs', (c) => {
    try {
        const surahs = db.prepare('SELECT * FROM surahs').all();
        return c.json(surahs);
    } catch (err) {
        return c.json({ error: "Database error" }, 500);
    }
});

// Specific Surah details
app.get('/api/surah/:id', (c) => {
    try {
        const id = c.req.param('id');
        const surah = db.prepare('SELECT * FROM surahs WHERE id = ?').get(id);
        const ayahs = db.prepare('SELECT * FROM ayahs WHERE surah_id = ?').all(id);

        if (!surah) return c.json({ error: "Surah not found" }, 404);
        return c.json({ ...surah as object, ayahs });
    } catch (err) {
        return c.json({ error: "Database error" }, 500);
    }
});

// Search API
app.get('/api/search', (c) => {
    const query = c.req.query('q');
    if (!query || query.length < 2) return c.json([]);
    const results = db.prepare('SELECT * FROM ayahs WHERE translation LIKE ? LIMIT 20')
        .all(`%${query}%`);
    return c.json(results);
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);