// src/llms/anthropic.ts
import Anthropic from "@anthropic-ai/sdk";
import { LLMOptions, LLMResponse, LLMProviderClient } from "./types";
import * as dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.ANTHROPIC_API_KEY as string;

const anthropic = new Anthropic({ apiKey });
const defaultSystemPrompt = `You are a helpful AI assistant.`;

export const anthropicClient: LLMProviderClient = {
  generate: async (prompt: string, options?: LLMOptions): Promise<LLMResponse> => {
    try {
      const systemPrompt = options?.systemPrompt || defaultSystemPrompt;
      const msg = await anthropic.messages.create({
        model: options?.model || "claude-3-7-sonnet-20250219",
        max_tokens: options?.maxTokens || 1024,
        messages: [
          {
            role: "assistant",
            content: systemPrompt,
          },
          { role: "user", content: prompt },
        ],
      });
      return { text: msg.content[0].text || "" };
    } catch (error) {
      console.error("Error generating command with Anthropic:", error);
      return { text: "Error generating command." };
    }
  }
};
