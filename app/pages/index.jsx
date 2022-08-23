import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import io from 'socket.io-client';
import { getVotes } from '../redis/client';
import { useVotes, vote } from '../services/services';
const socket = io();

const REGION = process.env.NEXT_PUBLIC_REGION;

export default function Home(props) {
    const votes = useVotes(props);

    return (
        <>
            <Head>
                <title>{REGION}</title>
                <meta
                    name="description"
                    content="Click one of the pictures below to vote for your favorite yummy treat!"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
            </Head>

            <main className="bg-slate-50 h-screen">
                <div className="text-center p-3">
                    <h1 className="text-2xl">
                        Hi {REGION}!
                    </h1>
                    <p>
                        Click one of the pictures below to vote for your
                        favorite!
                    </p>
                </div>

                <div className="select-none flex justify-center">
                    <div
                        className="block p-5 mx-3 cursor-pointer rounded-lg shadow-lg bg-white active:bg-slate-50 max-w-sm"
                        onClick={() => {
                            void vote('ice-cream');
                        }}>
                        <h5 className="text-gray-900 font-bold text-xl leading-tight mb-2">
                            Ice Cream
                        </h5>
                        <Image
                            src="/ice_cream.jpg"
                            alt="Ice Cream"
                            width={616 / 2}
                            height={462 / 2}
                        />
                        <div className="flex flex-wrap justify-center space-x-2">
                            <span className="px-4 py-2 rounded-full text-white bg-blue-500 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-blue-600 transition duration-300 ease">
                                {votes.iceCream}
                            </span>
                        </div>
                    </div>
                    <div
                        className="block p-5 mx-3 cursor-pointer rounded-lg shadow-lg bg-white active:bg-slate-50 max-w-sm"
                        onClick={() => {
                            void vote('cheesecake');
                        }}>
                        <h5 className="text-gray-900 font-bold text-xl leading-tight mb-2">
                            Cheesecake
                        </h5>
                        <Image
                            src="/cheesecake.jpg"
                            alt="Cheesecake"
                            width={616 / 2}
                            height={462 / 2}
                        />
                        <div className="flex flex-wrap justify-center space-x-2">
                            <span className="px-4 py-2 rounded-full text-white bg-teal-500 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-teal-600 transition duration-300 ease">
                                {votes.cheesecake}
                            </span>
                        </div>
                    </div>
                    <div
                        className="block p-5 mx-3 cursor-pointer rounded-lg shadow-lg bg-white active:bg-slate-50 max-w-sm"
                        onClick={() => {
                            void vote('apple-pie');
                        }}>
                        <h5 className="text-gray-900 font-bold text-xl leading-tight mb-2">
                            Apple Pie
                        </h5>
                        <Image
                            src="/apple_pie.jpg"
                            alt="Apple Pie"
                            width={616 / 2}
                            height={462 / 2}
                        />
                        <div className="flex flex-wrap justify-center space-x-2">
                            <span className="px-4 py-2 rounded-full text-white bg-green-500 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-green-600 transition duration-300 ease">
                                {votes.applePie}
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export async function getServerSideProps() {
    return {
        props: await getVotes(),
    };
}
