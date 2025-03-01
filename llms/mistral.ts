// llms/mistral.ts
import { Mistral } from '@mistralai/mistralai';
import { LLMOptions, LLMResponse, LLMProviderClient } from "./types";
import * as dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.MISTRAL_API_KEY as string;

const client = new Mistral({ apiKey });
const defaultSystemPrompt = `You are a helpful AI assistant.`;

export const mistralClient: LLMProviderClient = {
  generate: async (prompt: string, options?: LLMOptions): Promise<LLMResponse> => {
    try {
      const systemPrompt = options?.systemPrompt || defaultSystemPrompt;
      const chatResponse = await client.chat.complete({
        model: options?.model || 'mistral-large-latest',
        messages: [
          { role: 'system', content: systemPrompt},
          { role: 'user', content: prompt }
      ],
      });

      return { text: chatResponse.choices[0].message.content || "" };
    } catch (error) {
      console.error('Error generating command with Mistral:', error);
      return { text: "Error generating command." };
    }
  }
};
