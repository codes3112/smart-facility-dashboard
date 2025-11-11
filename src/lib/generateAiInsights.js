import OpenAI from "openai";

export async function generateAiInsights(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  const client = apiKey ? new OpenAI({ apiKey }) : null;

  if (!client) {
    console.info("No OpenAI key found — returning mock insight.");
    

    const mockResponseMap = {
      "zone a": "Zone A energy usage increased by 12% due to extended office hours and HVAC demand.",
      "zone b": "Zone B lighting systems ran 3 hours longer this week, contributing to a 15% increase in consumption.",
      "zone c": "Zone C shows optimal efficiency with 8% reduction after implementing automated lighting controls.",
      "zone d": "Zone D peak load detected at 3PM — conference room cooling systems compensating for occupancy.",
      "zone e": "Zone E server room maintains stable temperature with 5% energy savings from new cooling optimization.",
      "overall": "Overall facility energy consumption dropped by 8% after automation changes across all zones.",
      "hvac": "Recommend scheduling HVAC maintenance for Zone A to improve efficiency by estimated 10%.",
      "lighting": "Zone B lighting systems ran 3 hours longer this week, contributing to a 15% increase in consumption.",
      "cooling": "Zone D peak load detected at 3PM — conference room cooling systems compensating for occupancy.",
      "server": "Zone E server room maintains stable temperature with 5% energy savings from new cooling optimization.",
      "efficiency": "Zone C shows optimal efficiency with 8% reduction after implementing automated lighting controls.",
      "maintenance": "Recommend scheduling HVAC maintenance for Zone A to improve efficiency by estimated 10%.",
      "equipment": "Zone B lab equipment running during off-hours — consider implementing power scheduling.",
    };
    
    const lowerPrompt = prompt.toLowerCase();
    
    let mockResponse = null;
    for (const [keyword, response] of Object.entries(mockResponseMap)) {
      if (lowerPrompt.includes(keyword)) {
        mockResponse = response;
        break;
      }
    }
    
    // Fallback to random response if no keyword match
    if (!mockResponse) {
      const allResponses = [...new Set(Object.values(mockResponseMap))];
      mockResponse = allResponses[Math.floor(Math.random() * allResponses.length)];
    }
    
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
    
    // Extract error details with fallbacks
    const errorCode = error?.code || error?.status || 'UNKNOWN';
    const errorMessage = error?.message || 'An unexpected error occurred';
    
    // Create enhanced error object with metadata
    const enhancedError = new Error(errorMessage);
    enhancedError.code = errorCode;
    enhancedError.statusCode = error?.status || 500;
    enhancedError.originalError = error;
    enhancedError.timestamp = new Date().toISOString();
    
    // Throw the error to be handled by the server
    throw enhancedError;
  }
}