import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

export const generateSetlist = async (eventType: string, mood: string): Promise<string> => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    // Fallback for demo purposes if no key is present
    return `1. Amazing Grace - Traditional\n2. Hallelujah - Leonard Cohen\n3. Stand By Me - Ben E. King\n4. Can't Help Falling in Love - Elvis Presley\n(Add your API Key to see real AI suggestions based on '${eventType}' and '${mood}')`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a curated 5-song setlist for a singing group (choir/acapella) for a "${eventType}" event with a "${mood}" mood. 
      Format as a simple numbered list with Song Title - Artist. Keep it elegant.`,
    });
    return response.text || "Unable to generate setlist at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating setlist. Please try again.";
  }
};
