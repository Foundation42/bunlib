// shared/llms/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { LLMOptions, LLMResponse, LLMProviderClient } from "./types";
import * as dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.GOOGLE_API_KEY as string;

const genAI = new GoogleGenerativeAI(apiKey);

export const geminiClient: LLMProviderClient = {
    generate: async (prompt: string, options?: LLMOptions): Promise<LLMResponse> => {
        try {
          const systemPrompt = options?.systemPrompt || "";
          const model = genAI.getGenerativeModel({ model: options?.model || 'gemini-1.5-flash' });
          const result = await model.generateContent(`${systemPrompt}\n${prompt}`);
          return { text: result.response.text() || "" };
        } catch (error) {
          console.error('Error generating text with Gemini:', error);
          return { text: "Error generating command." };
        }
      }
  };
