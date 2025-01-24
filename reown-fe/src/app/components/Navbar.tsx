import React from 'react';
import { ProtectedRoute } from '../utils/isConnected';
import {generateChatId} from "../utils/generateChatId";
import { useRouter } from 'next/navigation';
export default function Navbar() {
    const router = useRouter();
    const handleNewChat = () => {
        const chatId = generateChatId();
        router.push(`/chat/${chatId}`);
    };


    return (
        <header className="w-screen px-4 flex justify-between items-center bg-white border-b border-gray-200">
            <div className="flex items-center">
                <div className="  inline text-xl        font-bold">Reown <span className='hidden sm:inline-block '>
                    Chat Solana
                </span>
                </div>
            </div>
            <ProtectedRoute>
                <div className='bg-blue-400 rounded py-2 px-4 text-white font-bold hover:bg-blue-500 cursor-pointer transition-colors'
                onClick={handleNewChat}
                >
                    Chat Now
                </div>
            </ProtectedRoute>
            <div className="flex items-center">
                <appkit-button
                    style={{ color: 'white', padding: '10px', border: '1px solid white' }}
                    disabled={false}
                    balance="show"
                    size="md"
                    label="Connect"
                    loadingLabel="Connecting..."
                />
            </div>
        </header>
    );
}