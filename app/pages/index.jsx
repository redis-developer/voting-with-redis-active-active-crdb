import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import io from 'socket.io-client';
import styles from '../styles/Home.module.css';
import { getVotes } from '../redis/client';
import { useVotes, vote } from '../services/services';
const socket = io();

const REGION = process.env.NEXT_PUBLIC_REGION;

export default function Home(props) {
    const votes = useVotes(props);

    return (
        <div className={styles.container}>
            <Head>
                <title>{REGION}</title>
                <meta
                    name="description"
                    content="Click one of the pictures below to vote for your favorite yummy treat!"
                />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Hi {REGION}! Vote for your favorite food!
                </h1>
                <p className={styles.description}>
                    Click one of the pictures below to vote for your favorite!
                </p>

                <div className={styles.grid}>
                    <div
                        className={styles.card}
                        onClick={() => {
                            void vote('ice-cream');
                        }}>
                        <h2>Ice Cream</h2>
                        <Image
                            src="/ice_cream.jpg"
                            alt="Ice Cream"
                            width={616 / 2}
                            height={462 / 2}
                        />
                        <span>Votes: {votes.iceCream}</span>
                    </div>
                    <div
                        className={styles.card}
                        onClick={() => {
                            void vote('cheesecake');
                        }}>
                        <h2>Cheesecake</h2>
                        <Image
                            src="/cheesecake.jpg"
                            alt="Cheesecake"
                            width={616 / 2}
                            height={462 / 2}
                        />
                        <span>Votes: {votes.cheesecake}</span>
                    </div>
                    <div
                        className={styles.card}
                        onClick={() => {
                            void vote('apple-pie');
                        }}>
                        <h2>Apple Pie</h2>
                        <Image
                            src="/apple_pie.jpg"
                            alt="Apple Pie"
                            width={616 / 2}
                            height={462 / 2}
                        />
                        <span>Votes: {votes.applePie}</span>
                    </div>
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps() {
    return {
        props: await getVotes(),
    };
}
