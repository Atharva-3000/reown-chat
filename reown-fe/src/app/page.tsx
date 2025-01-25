"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Cpu, MessageSquare, MessageSquarePlus, Rocket } from "lucide-react"
import { createAppKit, useAppKitAccount } from "@reown/appkit/react"
import { solana, solanaDevnet, solanaTestnet } from "@reown/appkit/networks"
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { generateChatId } from "./utils/generateChatId"
import { useRouter } from "next/navigation"
// import video file
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
  themeMode: 'dark'
})


export default function Home() {
  const router = useRouter();
  const handleNewChat = () => {
    const chatId = generateChatId()
    router.push(`/chat/${chatId}`)
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHovering, setIsHovering] = useState(false)
  const { isConnected } = useAppKitAccount()
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <div className="fixed inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          >
            <source src="./video.mp4" type="video/mp4" />
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10" />
        </div>
        <Navbar />
        <div className="relative z-10 mt-20">
          <div className="flex-1 container mx-auto px-4">
            <div className="flex-1 container mx-auto px-4 py-8">
              <section className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">Welcome to Reown Chat Solana</h1>
                <p className="text-xl text-white mb-8">Your AI-powered blockchain assistant</p>
                <div className="relative inline-block">

                  {!isConnected ? (
                    <appkit-button />
                  ) : (
                    <Button onClick={handleNewChat} className="bg-blue-500 hover:bg-blue-600 text-white">
                      <MessageSquarePlus className="w-4 h-4 mr-2" />
                      New Chat
                    </Button>
                  )}
                  {isHovering && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  )}
                </div>
              </section>

              <section className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-12">
                <Card className="text-white border-none  bg-black/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bot className="mr-2" /> AI-Powered Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Chat with our intelligent AI that understands blockchain concepts and can assist you with various tasks.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="text-white border-none  bg-black/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Cpu className="mr-2" /> Blockchain Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Seamlessly interact with blockchain functions and get real-time information about your assets and
                      transactions.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="text-white border-none  bg-black/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="mr-2" /> Natural Conversations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Engage in natural language conversations about complex blockchain topics and receive easy-to-understand
                      explanations.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="text-white border-none  bg-black/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Rocket className="mr-2" /> Powered by Solana
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Experience the speed and efficiency of Solana&apos;s blockchain technology integrated directly into your chat
                      experience.
                    </CardDescription>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

