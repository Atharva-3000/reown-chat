"use client";
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { createAppKit } from "@reown/appkit"
import Navbar from './components/Navbar';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
    throw new Error('Project Id is not defined.')
}

const solanaWeb3JsAdapter = new SolanaAdapter({
    wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const metadata = {
    name: "appkit-example",
    description: "AppKit Example - Solana",
    url: "https://exampleapp.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const modal = createAppKit({
    adapters: [solanaWeb3JsAdapter],
    projectId,
    networks: [solana, solanaTestnet, solanaDevnet],
    features: {
        analytics: true,
        email: true, 
        socials: ['google', 'x', 'github', 'discord', 'farcaster'],
        emailShowWallets: true
    },
    themeMode: 'light'
})

export default function Home() {
  return (
    <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
      <Navbar />
      <h2 className="my-8 text-2xl font-bold leading-snug text-center">Examples</h2>
      <div className="max-w-4xl">
        <div className="grid bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <h3 className="text-sm font-semibold bg-gray-100 p-2 text-center">Connect your wallet</h3>
          <div className="flex justify-center items-center p-4">
            <appkit-button />
          </div>
        </div> 
        <br></br>
        <div className="grid bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <h3 className="text-sm font-semibold bg-gray-100 p-2 text-center">Network selection button</h3>
          <div className="flex justify-center items-center p-4">
            <appkit-network-button />
          </div>
        </div>
      </div>
    </main>
  );
}