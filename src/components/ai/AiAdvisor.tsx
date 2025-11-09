import { useState } from "react";
import { useAiInsights } from "@/hooks/useAiInsights";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import AppCard from "../AppCard";

export function AiAdvisor() {
  const [prompt, setPrompt] = useState("");
  const { generateInsight, loading, error, insight } = useAiInsights();

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    await generateInsight(prompt);
  };

  return (
    <AppCard title="AI Energy Advisor">
      <p className="text-sm text-muted-foreground">
        Ask questions about energy usage, anomalies, or performance trends.
      </p>

      <Textarea
        placeholder="e.g. Why did energy usage increase in Zone 3 this week?"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Generating..." : "Ask AI"}
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {insight && (
        <div>
          <p>{insight.response}</p>
          <small>Mode: {insight.mode}</small>
        </div>
      )}

      {insight && (
        <ScrollArea className="h-[160px] rounded-md border p-3 text-sm bg-muted/20">
          <p className="font-medium mb-1 text-muted-foreground">
            You asked:
          </p>
          <p className="mb-3">{insight.prompt}</p>
          <p className="font-medium mb-1 text-muted-foreground">AI Insight:</p>
          <p>{insight.response}</p>
        </ScrollArea>
      )}
    </AppCard>
  );
}