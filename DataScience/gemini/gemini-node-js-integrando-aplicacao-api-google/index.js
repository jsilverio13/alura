import { GoogleGenerativeAI } from "@google/generative-ai";
import { fazerPergunta } from "./pergunta.js";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  let prompt =
    "Você é um site de viagens e deve responder somente sobre esse assunto" +
    " Caso o usuário pergunte sobre algo diferente, diga que não pode responder. " +
    " O usuário escolheu: ";
  prompt += await fazerPergunta("Me fale sobre o destino que deseja conhecer: ");

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
}

run();
