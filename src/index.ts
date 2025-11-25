import promptSync from "prompt-sync";
import { agent } from "./agent";



const prompt = promptSync();
const config = {
    configurable: { thread_id: "1" },
    context: { user_id: "1" },
};

async function userQuery(query?: string): Promise<any> {
    const question: string = prompt("Question: ");

    const response = await agent.invoke(
        { messages: [{ role: "user", content: question }] },
        config
    );

    const finalAiMessage = [...response.messages]
        .reverse()
        .find(m => m._getType?.() === "ai" && m.content?.trim());

    const answer_text = finalAiMessage?.content;


    console.log({ "response": answer_text });
    return answer_text;
}

userQuery();



