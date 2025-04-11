import OpenAI from "openai";

export const configureOpenAI = () => {
  const config = new OpenAI({
    apiKey: "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",
    baseURL: "https://openrouter.ai/api/v1/chat/completions"
  });
  return config;
};
