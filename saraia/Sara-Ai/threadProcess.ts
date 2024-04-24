import { OpenAiInstance } from "./OpenAiInstance";


export const threadProcess = async(
    threadId: any, //cambiar al correcto no hay que ser nacos
    message: string,
    userId: string
): Promise<any> => {await OpenAiInstance.beta.threads.create({
    //@ts-ignore
    threadId: threadId,
    messages: [
        {
        role: "user",
        content:message,
        // Insertar el nuevo archivo
        //attachments: [{ file_id: aapl10k.id, tools: [{ type: "file_search" }] }],
    },
    ],
})};