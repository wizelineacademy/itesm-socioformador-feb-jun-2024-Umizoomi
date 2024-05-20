import { OpenAiInstance } from "./OpenAiInstance";


export const threadProcess = async(
    threadId: any, //cambiar al correcto no hay que ser nacos
    messages: string,
    userId: string
): Promise<any> => {
    try{
        const thread = await OpenAiInstance.beta.threads.create({})
        const message = await OpenAiInstance.beta.threads.create(
            //@ts-ignore
            thread.id, //no se porque marca error, esta como en la documentación
            {
                role: "user",
                content: messages

            }
        );
        let run = await OpenAiInstance.beta.threads.runs.createAndPoll(threadId.id, {
            //@ts-ignore
            assistant_id: assistant.id, //assistant aún no se crea, es placeholder
            instructions: "Address the user by its name and "
        });


}catch(error){
        console.log('error in thread')
    }};