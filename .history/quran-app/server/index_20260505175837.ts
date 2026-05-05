// Search API Fix
app.get('/api/search', (c) => {
    const query = c.req.query('q');
    if (!query || query.length < 2) return c.json([]); // Khub choto query block kora

    // Bun:sqlite-e query parameter eivabe dile shubidha
    const results = db.query('SELECT * FROM ayahs WHERE translation LIKE ? LIMIT 20')
        .all(`%${query}%`);

    return c.json(results);
});