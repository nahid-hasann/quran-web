import { handle } from 'hono/vercel'; // Eita add koro

// ... (tomar baki code ager moto thakbe)

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

// Local-er jonno eita niche thakte pare
export default {
    port: 5001,
    fetch: app.fetch,
};