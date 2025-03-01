// src/llms/ollama.ts
import { LLMOptions, LLMResponse, LLMProviderClient } from "./types";
import * as dotenv from "dotenv";

dotenv.config();
const ollamaEndpoint = process.env.OLLAMA_ENDPOINT as string;
const defaultSystemPrompt = `You are a helpful AI assistant.`;

export const ollamaClient: LLMProviderClient = {
    generate: async (prompt: string, options?: LLMOptions): Promise<LLMResponse> => {
        const systemPrompt = options?.systemPrompt || defaultSystemPrompt;
        const fullPrompt = `${systemPrompt}\nUser Request: ${prompt}`;

        const body = {
          model: options?.model || "llama3.2:3b",
          system: systemPrompt,
          prompt: prompt,
          stream: false,
        };

        try {
          const response = await fetch(`${ollamaEndpoint}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
    
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
          }
    
          const data = await response.json();
          return { text: data.response || "" };
        } catch (error) {
          console.error("Error generating command with Ollama:", error);
          return { text: "Error generating command." };
        }
      }
  };
