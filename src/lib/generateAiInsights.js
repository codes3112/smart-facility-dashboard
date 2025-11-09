import OpenAI from "openai";

export async function generateAiInsights(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  const client = apiKey ? new OpenAI({ apiKey }) : null;

  if (!client) {
    console.log("No OpenAI key found — returning mock insight.");
    const mockResponses = [
      "Zone 1 energy usage increased slightly due to HVAC demand.",
      "Lighting systems ran longer hours this week in Zone 2.",
      "Overall energy consumption dropped by 8% after automation changes.",
      "Peak load detected at 3PM — cooling systems compensating.",
    ];
    const mockResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    return { response: mockResponse, mode: "mock" };
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an AI energy advisor. Provide short, data-driven insights for smart facility dashboards.",
        },
        { role: "user", content: prompt },
      ],
    });
    const aiResponse = completion.choices[0].message?.content?.trim() ?? "";
    return { response: aiResponse, mode: "live" };
  } catch (error) {
    console.error("AI API Error:", error);
    return {
      response: "Unable to fetch AI insights right now. Please check your API key or try again later.",
      mode: "mock",
    };
  }
}