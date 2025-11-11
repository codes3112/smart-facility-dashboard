import { useState } from "react";

export function useAiInsights() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insight, setInsight] = useState<{ prompt: string; response: string, mode:string } | null>(null);

  const generateInsight = async (prompt: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error(`Something went wrong. Please check your API key. Server returned ${res.status}`);

      const data = await res.json();
      setInsight({ prompt, response: data.response, mode: data.mode });
    } catch (err: any) {
      setError(err.message || "Failed to generate insight");
    } finally {
      setLoading(false);
    }
  };

  return { generateInsight, loading, error, insight };
}