// llms/router.ts
import type { LLMConfig, LLMOptions, LLMResponse } from "./types";
import { openAIClient } from "./openai";
import { anthropicClient } from "./anthropic";
import { deepseekClient } from "./deepseek";
import { geminiClient } from "./gemini";
import { mistralClient } from "./mistral";
import { ollamaClient } from "./ollama";
import { vertexClient } from "./vertex";

// Function to strip <think> blocks from text
function stripThinkBlocks(text: string): string {
  return text.replace(/<think>.*?<\/think>/gs, "").trim();
}

// Default options
const defaultOptions: LLMOptions = {
  stripThink: true
};

export async function generate(
  systemPrompt: string,
  prompt: string,
  modelConfig: LLMConfig,
  options: LLMOptions = defaultOptions // apply default options
): Promise<LLMResponse> {
  const finalOptions: LLMOptions = {
    systemPrompt,
    ...options,
    model: modelConfig.model,
  }; // Apply system prompt and other options, but set model manually
  
  let response: LLMResponse;

  switch (modelConfig.provider) {
    case "openai":
      response = await openAIClient.generate(prompt, finalOptions);
      break;
    case "anthropic":
      response = await anthropicClient.generate(prompt, finalOptions);
      break;
    case "deepseek":
      response = await deepseekClient.generate(prompt, finalOptions);
      break;
    case "gemini":
      response = await geminiClient.generate(prompt, finalOptions);
      break;
    case "mistral":
      response = await mistralClient.generate(prompt, finalOptions);
      break;
    case "ollama":
      response = await ollamaClient.generate(prompt, finalOptions);
      break;
    case "vertex":
      response = await vertexClient.generate(prompt, finalOptions);
      break;
    default:
      throw new Error(`Unsupported LLM provider: ${modelConfig.provider}`);
  }

  // Strip <think> blocks if stripThink is true
  if (finalOptions.stripThink) {
    response.text = stripThinkBlocks(response.text);
  }

  return response;
}
