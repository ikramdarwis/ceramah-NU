import { GoogleGenAI } from "@google/genai";
import { NU_PERSONA_PROMPT } from '../constants';

const getClient = (apiKey?: string) => {
  // Prioritize user-provided key, fallback to env var
  const finalKey = apiKey || process.env.API_KEY;
  if (!finalKey) {
    throw new Error("API Key belum diatur. Silakan masukkan API Key Gemini Anda di menu pengaturan.");
  }
  return new GoogleGenAI({ apiKey: finalKey });
};

export const checkApiKeyValidity = async (apiKey: string): Promise<boolean> => {
  if (!apiKey) return false;
  try {
    const ai = new GoogleGenAI({ apiKey });
    // Minimal token usage request to verify key using Flash model
    await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: 'Ping' }] }],
    });
    return true;
  } catch (error) {
    console.warn("API Key validation check failed:", error);
    return false;
  }
};

export const generateLectureContent = async (topic: string, apiKey?: string): Promise<string> => {
  const ai = getClient(apiKey);

  try {
    // Optimization: Using 'gemini-3-flash-preview' instead of Pro.
    // It is significantly faster and cheaper (less quota usage), satisfying the "minim penggunaan apikey" request
    // while maintaining excellent quality for this type of content.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [
            { text: NU_PERSONA_PROMPT },
            { text: `Topik Ceramah: ${topic}` }
          ]
        }
      ],
      // Removed thinkingConfig to minimize token usage as Flash performs well for this structure without it.
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated.");
    }
    return text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Gagal membuat ceramah. Periksa API Key atau koneksi Anda.");
  }
};
