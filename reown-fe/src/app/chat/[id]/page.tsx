"use client"
import Chat from "@/components/Chat"
import { Button } from "@/components/ui/button"
import { useAppKitAccount } from "@reown/appkit/react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { LogOut } from "lucide-react"
export default function ChatPage() {
    const { id } = useParams()
    const { isConnected } = useAppKitAccount()
    const router = useRouter()

    useEffect(() => {
        if (!isConnected) {
            toast.error("You must be connected to chat")
            router.push("/")
        }
    }, [isConnected, router])

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-white shadow-sm p-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Chat Thread: {id}</h1>
                <div>
                    <Button variant={"destructive"} onClick={() => {
                        toast.error("Chat Ended")
                        router.push("/")
                    }
                    }>End Chat {<LogOut />}</Button>
                </div>
            </div>
            <div className="flex-1 overflow-hidden">
                <Chat />
            </div>
        </div>
    )
}

