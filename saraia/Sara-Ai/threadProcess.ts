import { OpenAiInstance } from "./OpenAiInstance";


export const threadProcess = async(
    threadId: any, //cambiar al correcto no hay que ser nacos
    message: string,
    userId: string
): Promise<any> => {
    try{
        await OpenAiInstance.beta.threads.create({
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
    })
    const run = await OpenAiInstance.beta.threads.runs.createAndPoll(threadId.id, {
        //@ts-ignore
        assistant_id: assistant.id, //assistant aún no se crea, es placeholder
    });


}catch(error){
        console.log('error')
    }};