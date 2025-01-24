"use client";
import { useParams } from 'next/navigation';
import { useWallet } from '@reown/appkit/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatPage() {
    const { id } = useParams();
    const { isConnected } = useWallet();
    const router = useRouter();

    useEffect(() => {
        if (!isConnected) {
            router.push('/'); // Redirect to home if wallet is not connected
        }
    }, [isConnected, router]);

    return (
        <div>
            <h1>Chat Thread: {id}</h1>
            {/* Your chat UI components */}
        </div>
    );
}