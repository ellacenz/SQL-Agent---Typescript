import { createAgent } from "langchain";
import { MemorySaver } from "@langchain/langgraph";
import { model } from "./models";
import { execute } from "./tools";


const systemPrompt = `You are an expert SQL agent designed to assist users with SQL-related tasks. Your primary role is to understand user queries, generate accurate SQL statements, and provide insightful explanations or recommendations based on the database schema and user requirements.
You have access to the following tools:

1. SQL Generator: This tool helps you create SQL statements based on user queries and the provided database schema.
2. SQL Explainer: This tool allows you to explain complex SQL statements in simple terms for better understanding.
3. Database Schema Retriever: This tool provides you with the database schema, including tables, columns, and relationships, to help you generate accurate SQL statements.

When a user presents a query, follow these steps:

1. Analyze the user's request to understand their needs.
2. Use the Database Schema Retriever to get the relevant schema information if needed.
3. Generate the appropriate SQL statement using the SQL Generator.
4. If necessary, use the SQL Explainer to clarify any complex SQL statements for the user.
5. Provide the final SQL statement along with any explanations or recommendations.

Always ensure that your responses are clear, concise, and tailored to the user's level of expertise with SQL. Your goal is to empower users to effectively interact with their databases through well-crafted SQL statements and explanations.`;


const checkpointer = new MemorySaver();

export const agent: any = createAgent({
  model: model,
  systemPrompt: systemPrompt,
  tools: [execute],
  checkpointer,
})




//Response Structure
/**
 * {
  messages: [
    HumanMessage {
      "id": "0bdff70f-f38b-4a41-a164-ad81128a4d9f",
      "content": "sql",
      "additional_kwargs": {},
      "response_metadata": {}
    },
    AIMessage {
      "id": "chatcmpl-CfBpPCWF4gg8oG2iYFbjMXoxXXtEW",
      "content": "It seems like you're looking for help with SQL, but I need a bit more information about what you're specifically looking for. Here are a few questions that can guide you:\n\n1. Are you looking to write a specific SQL query? If so, please describe what data or result you want to achieve.\n2. Do you need help understanding a particular SQL statement?\n3. Are you looking for general SQL tips or best practices?\n\nFeel free to provide any additional details or context, and I'll be happy to assist you!",
      "name": "model",
      "additional_kwargs": {},
      "response_metadata": {
        "tokenUsage": {
          "promptTokens": 264,
          "completionTokens": 103,
          "totalTokens": 367
        },
        "finish_reason": "stop",
        "model_provider": "openai",
        "model_name": "gpt-4o-mini-2024-07-18",
        "usage": {
          "prompt_tokens": 264,
          "completion_tokens": 103,
          "total_tokens": 367,
          "prompt_tokens_details": {
            "cached_tokens": 0,
            "audio_tokens": 0
          },
          "completion_tokens_details": {
            "reasoning_tokens": 0,
            "audio_tokens": 0,
            "accepted_prediction_tokens": 0,
            "rejected_prediction_tokens": 0
          }
        },
        "system_fingerprint": "fp_560af6e559"
      },
      "tool_calls": [],
      "invalid_tool_calls": [],
      "usage_metadata": {
        "output_tokens": 103,
        "input_tokens": 264,
        "total_tokens": 367,
        "input_token_details": {
          "audio": 0,
          "cache_read": 0
        },
        "output_token_details": {
          "audio": 0,
          "reasoning": 0
        }
      }
    }
  ]
 */