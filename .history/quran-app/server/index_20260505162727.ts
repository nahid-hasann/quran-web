import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/*', cors())

// 1. Sob Surah er list anar jonno
app.get('/api/surahs', async (c) => {
    const response = await fetch('https://api.alquran.cloud/v1/surah')
    const data = await response.json()
    return c.json(data.data)
})

// 2. Specific ekta Surah er Ayah gulo anar jonno
app.get('/api/surah/:id', async (c) => {
    const id = c.req.param('id')
    // Amra ekhane translation shoho data anchi (English - Saheeh International)
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${id}/en.sahih`)
    const data = await response.json()
    return c.json(data.data)
})

export default {
    port: 8000,
    fetch: app.fetch,
}