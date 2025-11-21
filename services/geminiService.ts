import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { AiRecipe } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRecipeSuggestion = async (items: string[]): Promise<AiRecipe | null> => {
  if (items.length === 0) return null;

  const prompt = `I have the following items in my shopping cart: ${items.join(', ')}. 
  Suggest a simple, creative recipe or meal idea I could make using some of these ingredients (and common pantry staples). 
  Keep it brief and inspiring.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful culinary assistant. Provide output in JSON format.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Name of the dish" },
            summary: { type: Type.STRING, description: "A 1-2 sentence description of the dish." },
            ingredients: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of key ingredients used from the cart + staples."
            }
          },
          required: ["title", "summary", "ingredients"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as AiRecipe;
  } catch (error) {
    console.error("Error fetching recipe from Gemini:", error);
    return null;
  }
};
