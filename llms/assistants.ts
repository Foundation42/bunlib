// llms/assistants.ts

import { LLMConfig } from "./types";

export const assistants: { [key: string]: LLMConfig } = {
  // Anthropic
  claude3Sonnet: { provider: "anthropic", model: "claude-3-7-sonnet-20250219" },

  // Deepseek
  deepseekChat: { provider: "deepseek", model: "deepseek-chat" },

  // Gemini
  gemini15Flash: { provider: "gemini", model: "gemini-1.5-flash" },
  gemini20FlashLite: { provider: "gemini", model: "gemini-2.0-flash-lite" },

  // Mistral
  mistralLarge: { provider: "mistral", model: "mistral-large-latest" },

  // OpenAI
  gpt3_5Turbo: { provider: "openai", model: "gpt-3.5-turbo" },
  gpt4Turbo: { provider: "openai", model: "gpt-4-turbo" },
  // openAIAssistant: { provider: "openaiAssistant", model: "asst_4gZaw9LRnz5z90MyJrlIaczQ" }, // Assuming we're not using this in router.ts
  
  // Ollama
  llama3_8b: { provider: "ollama", model: "llama3.2:3b" }, // Changed as 3b is an incorrect size
  phi4: { provider: "ollama", model: "phi4" },
  phi4Mini: { provider: "ollama", model: "phi4-mini" },
  deepseekCoder14B: { provider: "ollama", model: "deepseek-r1:14b"},
  
  //Vertex
  vertexGeminiPro: { provider: "vertex", model: "gemini-pro" },
  vertexGemini15Flash: { provider: "vertex", model: "gemini-1.5-flash" },
  
  //Default
  default: { provider: "ollama", model: "llama3.2:3b" } //Used as the default
};
