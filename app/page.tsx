"use client";

import { useState } from "react";

export default function ScamDetector() {
  // Store the textarea value in state
  const [message, setMessage] = useState("");

  // Called when the button is clicked
  const handleCheckScam = () => {
    alert(message);
  };

  return (
    <main className="min-h-screen bg-amber-50 flex items-center justify-center p-6 font-mono">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-widest uppercase">
            ⚠ Scam Alert Tool
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Scam Detector
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Paste a suspicious message below to inspect it.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border-2 border-gray-900 rounded-2xl shadow-[6px_6px_0px_#111827] p-6">

          {/* Textarea label */}
          <label
            htmlFor="message"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Paste message here
          </label>

          {/* Textarea */}
          <textarea
            id="message"
            rows={6}
            placeholder="e.g. Congratulations! You've won $1,000,000. Click here to claim..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-xl p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500 resize-none transition-colors"
          />

          {/* Character count */}
          <p className="text-xs text-gray-400 mt-1 text-right">
            {message.length} characters
          </p>

          {/* Button */}
          <button
            onClick={handleCheckScam}
            disabled={message.trim() === ""}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm tracking-wide transition-colors shadow-md"
          >
            🔍 Check Scam
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Your message is never sent anywhere. Everything stays on your device.
        </p>
      </div>
    </main>
  );
}
