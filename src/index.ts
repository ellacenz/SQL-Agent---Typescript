import promptSync from "prompt-sync";
import { agent } from "./agent";

const prompt = promptSync();

const config = {
    configurable: { thread_id: "1" },
    context: { user_id: "1" },
};

 async function userQuery(): Promise<any> {
    const question: string = prompt("Question: ");

    const response = await agent.invoke(
        { messages: [{ role: "user", content: question }] },
        config
    );
    const answer_text = response.messages[1].content;
        
    return {"response": answer_text}
}

userQuery();



