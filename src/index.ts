// import promptSync from "prompt-sync";
import { agent } from "./agent";
import Fastify from "fastify";


// Initialize Fastify app
const app = Fastify();

//const prompt = promptSync();
const config = {
    configurable: { thread_id: "1" },
    context: { user_id: "1" },
};

// Define a POST endpoint to handle user questions
app.post("/ask", async (request, reply) => {
    const { question } = request.body as { question: string };
    const response = await agent.invoke(
        { messages: [{ role: "user", content: question }] },
        config
    );

    const finalAiMessage = [...response.messages]
        .reverse()
        .find(m => m._getType?.() === "ai" && m.content?.trim());
    const answer_text = finalAiMessage?.content;

    return reply.send({ answer: answer_text });
});

app.get("/", async (request, reply) => {
    return reply.send({ message: `It feels so good to be a developer. 
        \nThank you so much for helping me get started. 
        \nExploring these concepts beyound the low code platform is pure joy. ` });
});

// Start the server
const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log("Server is running on http://localhost:3000");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
