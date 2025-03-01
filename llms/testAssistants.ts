import type { LLMConfig, LLMOptions } from "./types";
import { generate } from "./router";
import { assistants } from "./assistants";

interface TestResult {
  model: string;
  provider: string; // Added provider property
  success: boolean;
  duration: number;
  response?: string;
  error?: any;
}

async function testDriver() {
  const systemPrompt = "Translate English text to French with no comments or explanations, just say the translated text:";
  const prompt = "Hello, world!";

  // Define the models and options to test
  const testCases: { modelConfig: LLMConfig }[] = [
//    { modelConfig: assistants.claude3Sonnet },
//    { modelConfig: assistants.deepseekChat },
//    { modelConfig: assistants.deepseekCoder14B },
//    { modelConfig: assistants.gemini15Flash },
//    { modelConfig: assistants.gemini20FlashLite },
//    { modelConfig: assistants.mistralLarge },
//    { modelConfig: assistants.gpt3_5Turbo },
//    { modelConfig: assistants.gpt4Turbo },
//    { modelConfig: assistants.llama3_8b },
    { modelConfig: assistants.phi4 },
    { modelConfig: assistants.phi4Mini },
//    { modelConfig: assistants.vertexGeminiPro },
//    { modelConfig: assistants.vertexGemini15Flash },
//    { modelConfig: assistants.default },
  ];

  const results: TestResult[] = [];

  for (const testCase of testCases) {
    const startTime = performance.now();
    let success = true;
    let responseText: string | undefined;
    let error: any;
    try {
      console.log(`Testing model: ${testCase.modelConfig.model} (${testCase.modelConfig.provider})`); // Added provider to log
      const response = await generate(systemPrompt, prompt, testCase.modelConfig);
      const endTime = performance.now();
      const duration = endTime - startTime;
      responseText = response.text.trim();
      console.log("Response:", responseText);
      console.log(`Time taken: ${duration.toFixed(2)} ms`);
      results.push({
        model: testCase.modelConfig.model,
        provider: testCase.modelConfig.provider, // Added provider to results
        success: true,
        duration: duration,
        response: responseText,
      });
    } catch (err) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      success = false;
      error = err;
      console.error(`Error testing model ${testCase.modelConfig.model} (${testCase.modelConfig.provider}):`, error); // Added provider to error log
      console.log(`Time taken (with error): ${duration.toFixed(2)} ms`);
      results.push({
        model: testCase.modelConfig.model,
        provider: testCase.modelConfig.provider, // Added provider to results
        success: false,
        duration: duration,
        error: error,
      });
    }
  }
  printResultsTable(results);
}

function printResultsTable(results: TestResult[]) {
  console.log("\n--- Test Results Summary ---");

  // Sort results by duration (ascending)
  const sortedResults = results.slice().sort((a, b) => a.duration - b.duration);

  console.table(
    sortedResults.map((result) => ({
      Model: result.model,
      Provider: result.provider, // Added Provider column
      Success: result.success ? "Yes" : "No",
      Duration: `${result.duration.toFixed(2)} ms`,
      Response: result.response ? result.response : "N/A",
      Error: result.error ? result.error : "N/A",
    }))
  );
}

// Run the test driver
testDriver().catch(console.error);
