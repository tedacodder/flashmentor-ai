import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, Flashcard } from "./types";

// --- ENV SAFETY CHECK ---
if (!process.env.API_KEY) {
  throw new Error("API_KEY is not defined. Ensure this runs on the server.");
}

// --- CLIENT INIT ---
const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});

// --- VALID MODELS ---
const COMPLEX_MODEL = "gemini-1.5-pro";
const BASIC_MODEL = "gemini-1.5-flash";

// --- HELPER: extract JSON safely ---
function extractJson(text: string): any[] {
  try {
    const match = text.match(/\[[\s\S]*\]/);
    return match ? JSON.parse(match[0]) : [];
  } catch {
    return [];
  }
}

export const geminiService = {

  async generateQuiz(topic: string, difficulty: string): Promise<QuizQuestion[]> {
    const response = await ai.models.generateContent({
      model: COMPLEX_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate a ${difficulty} level quiz on the topic of "${topic}". Provide exactly 5 multiple choice questions.`,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              correctAnswer: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
            },
            required: [
              "id",
              "question",
              "options",
              "correctAnswer",
              "explanation",
            ],
          },
        },
      },
    });

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]";

    return extractJson(text);
  },

  async generateFlashcards(text: string): Promise<Flashcard[]> {
    const response = await ai.models.generateContent({
      model: BASIC_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Create concise study flashcards from the following text. Each flashcard should have a clear question and a helpful answer summarizing key concepts:\n\n${text}`,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              front: { type: Type.STRING },
              back: { type: Type.STRING },
            },
            required: ["id", "front", "back"],
          },
        },
      },
    });

    const resText =
      response.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]";

    return extractJson(resText);
  },

  async getChatStream(
    prompt: string,
    history: { role: "user" | "model"; parts: { text: string }[] }[]
  ) {
    return ai.models.generateContentStream({
      model: COMPLEX_MODEL,
      contents: [
        ...history,
        { role: "user", parts: [{ text: prompt }] },
      ],
      config: {
        systemInstruction:
          "You are FlashMentor, an elite academic AI tutor. Your mission is to provide high-clarity, student-centric explanations. IMPORTANT: You must respond using rich GitHub-flavored Markdown (headings, tables, code blocks, bold text, bullet points) and liberally use relevant emojis (📚, 💡, ✨, 🧠, 🚀) to make your answers visually engaging. Structure your responses like a professional, well-organized README file. Be encouraging and break down complex logic into step-by-step guides.",
      },
    });
  },
};
