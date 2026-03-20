"use client";

import { useState } from "react";

type AnalysisResult = {
  level: "High" | "Medium" | "Low";
  reason: string;
  advice: string;
};

export default function ScamDetector() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckScam = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server error ${res.status}: ${errText}`);
      }

      const data: AnalysisResult = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const levelColor: Record<AnalysisResult["level"], string> = {
    High: "bg-red-100 text-red-700 border border-red-300",
    Medium: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    Low: "bg-green-100 text-green-700 border border-green-300",
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900">Scam Detector</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Paste a suspicious message and let AI analyze it.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Paste message here
          </label>
          <textarea
            rows={5}
            placeholder="e.g. Congratulations! You've won $1,000,000. Click here to claim..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-red-400 resize-none"
          />
          <button
            onClick={handleCheckScam}
            disabled={message.trim() === "" || loading}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            {loading ? "Analyzing..." : "Check Scam"}
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-2xl p-4">
            <p className="text-sm font-semibold text-red-600 mb-1">Error</p>
            <p className="text-xs text-red-500 font-mono break-all">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-gray-500">Risk Level</span>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${levelColor[result.level]}`}>
                {result.level}
              </span>
            </div>
            <div className="mb-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Why</p>
              <p className="text-gray-800 text-sm leading-relaxed">{result.reason}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Advice</p>
              <p className="text-gray-800 text-sm leading-relaxed">{result.advice}</p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
