import OpenAI from "openai";

export const configureOpenAI = () => {
  const config = new OpenAI({
    apiKey: "",
    baseURL: ""
  });
  return config;
};
