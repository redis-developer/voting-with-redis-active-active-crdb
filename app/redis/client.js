import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL;
const [, PORT] = /:([\d]{2,5})/.exec(REDIS_URL);

const client = createClient({
    url: process.env.REDIS_URL,
});
client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    try {
        console.log(`Connecting to Redis on port: ${PORT}`);

        client.on('error', (err) => console.log('client error', err));
        client.on('connect', () => console.log('client is connected'));
        client.on('reconnecting', () => console.log('client is reconnecting'));
        client.on('ready', () => console.log('client is ready'));

        await client.connect();
    } catch (e) {
        console.log(e);
    }
})();

export async function getVotes() {
    const [iceCream, cheesecake, applePie] = await Promise.all([
        client.get('ice-cream'),
        client.get('cheesecake'),
        client.get('apple-pie'),
    ]);

    return {
        iceCream,
        cheesecake,
        applePie,
    };
}

export default client;
