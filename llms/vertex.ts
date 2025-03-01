// shared/llms/vertex.ts
import { VertexAI } from '@google-cloud/vertexai';
import type { LLMOptions, LLMResponse, LLMProviderClient } from "./types";
import * as dotenv from 'dotenv';

dotenv.config();
const projectId = process.env.GOOGLE_PROJECT_ID as string;
const location = process.env.GOOGLE_LOCATION as string;

const vertexAI = new VertexAI({ project: projectId, location: location });

export const vertexClient: LLMProviderClient = {
  generate: async (prompt: string, options?: LLMOptions): Promise<LLMResponse> => {
    try {
      const systemPrompt = options?.systemPrompt || "";
      const model = vertexAI.preview.getGenerativeModel({
        model: options?.model || 'gemini-pro',
      });

      const result = await model.generateContent(`${systemPrompt}\n${prompt}`);
      const response = await result.response;

      let generatedText = "";
      if (response && response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
          if (part.text) {
            generatedText += part.text;
          }
        }
      } else {
        console.error("No candidates found in the response.");
        console.log("full response", response);
        return { text: "Error generating text." };
      }

      return { text: generatedText };
    } catch (error) {
      console.error('Error generating text with Vertex AI:', error);
      return { text: "Error generating command." };
    }
  },
};
