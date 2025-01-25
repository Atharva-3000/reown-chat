"use client"

import { useState, useRef, useEffect } from "react"
import { continueConversation, type Message } from "../app/actions"
import { readStreamableValue } from "ai/rsc"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import {SyncLoader} from "react-spinners"
export default function Chat() {
  const [conversation, setConversation] = useState<Message[]>([])
  const [input, setInput] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messagesEndRef])

  const handleSendMessage = async () => {
    if (!input.trim()) return
    setIsLoading(true)
    const userMessage: Message = { role: "user", content: input }
    setConversation((prev) => [...prev, userMessage])
    setInput("")

    const { messages, newMessage } = await continueConversation([...conversation, userMessage])

    let textContent = ""
    for await (const delta of readStreamableValue(newMessage)) {
      textContent = `${textContent}${delta}`
      setConversation([...messages, { role: "assistant", content: textContent }])
    }
    setIsLoading(false)
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

