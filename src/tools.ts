import { tool } from "langchain";
import { conn } from "../db";


export const executeQuery = tool(
    async (input: { sqlQuery: string }) => {
        try {
            const connection = (await conn()) as any;
            if (!connection) throw new Error("No DB connection returned");

            console.log({"Query Used":input});
              const [rows] = await connection.execute(input);
              console.log( "Result: " +JSON.stringify(rows));
              return JSON.stringify(rows);

        } catch (error) {
            //console.error("Error executing SQL Query:", (error as Error).message);
            return `Error executing query: ${(error as Error).message}`;
        }
    },
    {
        name: "executeSQLQuery",
        description: "Executes a SQL query against the database and returns the results.",

    }
);





