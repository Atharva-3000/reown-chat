import React from "react"
import { ProtectedRoute } from "../app/utils/isConnected"
import { generateChatId } from "../app/utils/generateChatId"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageSquarePlus } from "lucide-react"

export default function Navbar() {
  const router = useRouter()
  const handleNewChat = () => {
    const chatId = generateChatId()
    router.push(`/chat/${chatId}`)
  }

  return (
    <header className="fixed w-full px-4 py-2 flex justify-between items-center bg-black/50 backdrop-blur-sm border-gray-200 z-50">
      <div className="flex items-center">
        <div className="text-xl font-bold bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
          Reown <span className="hidden sm:inline-block">Chat Solana</span>
        </div>
      </div>
      <ProtectedRoute>
        <Button onClick={handleNewChat} className="bg-blue-500 hover:bg-blue-600 text-white">
          <MessageSquarePlus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </ProtectedRoute>
      <div className="flex items-center">
        <appkit-button
          style={{ color: "white", padding: "10px"}}
          disabled={false}
          balance="show"
          size="md"
          label="Connect"
          loadingLabel="Connecting..."
        />
      </div>
    </header>
  )
}

