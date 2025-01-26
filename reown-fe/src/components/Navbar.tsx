import React from "react"
export default function Navbar() {

  return (
    <header className="fixed w-full px-4 py-2 flex justify-between items-center bg-black/50 backdrop-blur-sm border-gray-200 z-50">
      <div className="flex items-center">
        <div className="text-xl font-bold bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
          Reown <span className="hidden sm:inline-block">Chat Solana</span>
        </div>
      </div>
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

