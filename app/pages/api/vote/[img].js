import redis, { pubsub } from '../../../redis/client';

export default async function handler(req, res) {
    const key = req.query.img;
    const value = await redis.incr(key);
    res.status(200).send();
}
