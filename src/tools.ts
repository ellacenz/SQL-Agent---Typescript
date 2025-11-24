import { tool } from "langchain";
import { conn } from "../db";

export const execute = tool(
  async (input: { sqlQuery: string }) => {
    try {
      const connection = (await conn()) as any;
      const [rows] = await connection.execute(input.sqlQuery);
      return JSON.stringify(rows);
      
    } catch (error) {
      return `Error executing query: ${(error as Error).message}`;
    }
  },
  {
    name: "executeSQLQuery",
    description: "Executes a SQL query against the database and returns the results.",
    
  }
);



