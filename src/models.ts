import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();


// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// const model1 = new ChatGoogleGenerativeAI({
//   apiKey: process.env.GOOGLE_API_KEY,
//   model: "gemini-1.5-flash",
// });



export const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,   // <-- auth here
  model: "gpt-4o-mini",
});
