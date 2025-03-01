// src/llms/llmTypes.ts
export type LLMProvider =
  | "openai"
  | "anthropic"
  | "gemini"
  | "vertex"
  | "deepseek"
  | "mistral"
  | "ollama";

export interface LLMConfig {
  provider: LLMProvider;
  model: string;
  systemPrompt?: string; //optional systemPrompt
}

export interface LLMOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stream?: boolean;
  systemPrompt?: string; //optional systemPrompt
  // Add other common options here
}

export interface LLMResponse {
  text: string;
  // Add other relevant information like token usage, etc.
}

export interface GenerateCommand {
  (prompt: string, options?: LLMOptions): Promise<LLMResponse>;
}

export interface LLMProviderClient {
  generate: GenerateCommand;
}
