"use client"

import { useState, useRef, useEffect } from "react"
import { continueConversation, type Message } from "../app/actions"
import { readStreamableValue } from "ai/rsc"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import {SyncLoader} from "react-spinners"
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react"

export default function Chat() {
  const [conversation, setConversation] = useState<Message[]>([])
  const [input, setInput] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const walletData = useAppKitAccount();
  const networkDeets = useAppKitNetwork();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messagesEndRef])

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    const userMessage: Message = { role: "user", content: input };
    setConversation((prev) => [...prev, userMessage]);
    setInput("");
  
   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { messages, newMessage } = await continueConversation(
      [...conversation, userMessage], 
      walletData,
      networkDeets
    );
  
    // Stream each chunk as it arrives
    setConversation((prev) => [...prev, { role: "assistant", content: "" }]);
    
    for await (const delta of readStreamableValue(newMessage)) {
      setConversation((prev) => {
        const updatedMessages = [...prev];
        const lastMessageIndex = updatedMessages.length - 1;
        updatedMessages[lastMessageIndex] = {
          role: "assistant",
          content: updatedMessages[lastMessageIndex].content + delta
        };
        return updatedMessages;
      });
    }
    
    setIsLoading(false);
  }
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-100">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8 ">
          {conversation.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${message.role === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-200"
                  }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="max-w-[80%] p-3 rounded-lg bg-white text-gray-900 border border-gray-200">
                <SyncLoader
                  size={7}
                  margin={2}
                  speedMultiplier={0.6}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div>
        <div className="max-w-3xl mx-auto px-4 py-4 bg-white border-t rounded">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex space-x-2"
          >
            <Input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

