import { useEffect, useState } from 'react';

export async function getVotes() {
    const response = await fetch('/api/votes');
    return response.json();
}

export async function vote(product) {
    await fetch(`/api/vote/${product}`);
}

export function useVotes(initialState) {
    const [votes, setVotes] = useState({
        iceCream: initialState.iceCream,
        cheesecake: initialState.cheesecake,
        applePie: initialState.applePie,
    });

    useEffect(() => {
        let mounted = true;
        const interval = setInterval(async () => {
            const newVotes = await getVotes();

            if (!mounted) {
                return;
            }

            setVotes(newVotes);
        }, 100);

        return () => {
            mounted = false;
            clearInterval(interval);
        };
    }, []);

    return votes;
}
