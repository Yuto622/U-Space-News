import { GoogleGenAI } from "@google/genai";
import { NewsCategory, FetchNewsResponse } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchSpaceNews = async (category: NewsCategory): Promise<FetchNewsResponse> => {
  // Use a model that supports search grounding effectively
  const model = "gemini-2.5-flash";
  
  // Construct a prompt that enforces JSON output structure while using the search tool
  let prompt = `
    You are U-Space, a futuristic space news aggregator for Japan.
    
    TASK:
    1. Search for the very latest space news (focus on the last 24-48 hours) using Google Search.
    2. Select 6 distinct, exciting stories.
    3. If a specific category is provided ("${category}"), focus on that. Otherwise mix ROCKETS, ASTRONOMY, TECH, FUTURE.
    4. Translate and summarize the news into Japanese.
    
    OUTPUT FORMAT:
    Return a valid JSON object strictly matching this structure (do not use Markdown code blocks, just raw JSON string):
    {
      "articles": [
        {
          "id": "unique_string",
          "title": "Japanese title (max 40 chars)",
          "summary": "Japanese summary (max 80 chars)",
          "content": "Detailed article body in Japanese (approx 400 chars). detailed and futuristic tone.",
          "date": "YYYY.MM.DD (The actual date of the news)",
          "category": "One of: ROCKETS, ASTRONOMY, TECH, FUTURE",
          "readTime": "e.g. '3 min'",
          "impactScore": number (1-100),
          "sourceUrl": "The actual URL of the news source found"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        // googleSearch tool allows fetching real-time data
        tools: [{ googleSearch: {} }],
        // Note: responseSchema is often not compatible with search tools in the same request depending on the model version,
        // so we rely on the prompt to enforce JSON and parse the text manually.
        systemInstruction: "You are a specialized space news backend. Always output valid JSON. Never output markdown.",
      }
    });

    // Extract JSON from the text response
    let text = response.text || "";
    
    // Cleanup: Remove markdown code blocks if the model adds them despite instructions
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const data = JSON.parse(text) as FetchNewsResponse;
    
    // Fallback if array is empty
    if (!data.articles || data.articles.length === 0) {
        throw new Error("No articles generated");
    }

    return data;

  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Fallback data in case of error
    return {
      articles: [
        {
            id: "err-1",
            title: "システム通信障害: オフラインモード",
            summary: "最新ニュースの取得に失敗しました。しばらく経ってから再試行してください。",
            content: "現在、深宇宙通信ネットワークに障害が発生しています。APIクォータ制限、または接続エラーの可能性があります。手動での再接続を試みるか、しばらく待機してください。",
            date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
            category: NewsCategory.TECH,
            readTime: "0 min",
            impactScore: 0,
            sourceUrl: "#"
        }
      ]
    };
  }
};