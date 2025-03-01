// llms/deepseek.ts
import OpenAI from "openai";
import { LLMOptions, LLMResponse, LLMProviderClient } from "./types";
import * as dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.DEEPSEEK_API_KEY as string;

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: apiKey,
});

const defaultSystemPrompt = `You are a helpful AI assistant.`;

export const deepseekClient: LLMProviderClient = {
  generate: async (prompt: string, options?: LLMOptions): Promise<LLMResponse> => {
    try {
        const systemPrompt = options?.systemPrompt || defaultSystemPrompt;
      const completion = await openai.chat.completions.create({
        model: options?.model || "deepseek-chat",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          { role: "user", content: prompt },
        ],
        temperature: options?.temperature,
        max_tokens: options?.maxTokens,
        top_p: options?.topP
      });

      return { text: completion.choices[0].message.content || "" };
    } catch (error) {
      console.error("Error generating command with DeepSeek:", error);
      return { text: "Error generating command." };
    }
  }
};
