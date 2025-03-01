// llms/openai.ts
import OpenAI from "openai";
import type { LLMOptions, LLMResponse, LLMProviderClient } from "./types";
import * as dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY as string;

const openai = new OpenAI({ apiKey });

const defaultSystemPrompt = `You are a helpful AI assistant.`;

export const openAIClient: LLMProviderClient = {
  generate: async (prompt: string, options?: LLMOptions): Promise<LLMResponse> => {
    try {
      const systemPrompt = options?.systemPrompt || defaultSystemPrompt;

      const completion = await openai.chat.completions.create({
        model: options?.model || "gpt-4o-mini", // provide a default model
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          { role: "user", content: prompt }
        ],
        temperature: options?.temperature,
        max_tokens: options?.maxTokens,
        top_p: options?.topP
      });

      return { text: completion.choices[0].message.content || "" };
    } catch (error) {
      console.error("Error generating command with OpenAI:", error);
      return { text: "Error generating command." };
    }
  }
};
