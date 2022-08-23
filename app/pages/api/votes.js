import { getVotes } from '../../redis/client';

export default async function handler(req, res) {
    res.status(200).send(await getVotes());
}
