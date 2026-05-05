import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Frontend theke access korar jonno CORS enable kora
app.use('/*', cors())

// Sample Data (Check korar jonno)
const surahs = [
    { id: 1, name: "Al-Fatihah", total_ayahs: 7, type: "Meccan" },
    { id: 2, name: "Al-Baqarah", total_ayahs: 286, type: "Medinan" }
]

app.get('/surahs', (c) => {
    return c.json(surahs)
})

export default {
    port: 8000,
    fetch: app.fetch,
}