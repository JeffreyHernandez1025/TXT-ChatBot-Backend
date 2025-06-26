import { GoogleGenAI } from "@google/genai";

export default async function generateResponse(context, query) {
    const ai = new GoogleGenAI({
        apiKey: process.env.API_KEY
    });
    const prompt = `Based on the following information given from the TXT Website: \n ${context} \n Answer the following question: ${query}. \n Do not mention the provided text, only that the answer is based off of information from the website.`
    const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return res.text
}