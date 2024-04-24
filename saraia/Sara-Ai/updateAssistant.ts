import { config } from 'dotenv';
import * as fs from 'fs';
import { OpenAiInstance } from './OpenAiInstance';
config();

async function main() {


    // Crear un archivo para "entrenamiento"
    /*
    const file = await OpenAiInstance.files.create({
        file: fs.createReadStream('pendiente'),
        purpose: 'assistants',
    });
    console.log(file);
    */

    //Creación assistant
    const assistant = await OpenAiInstance.beta.assistants.create({
        name: 'Sara1.0',
        instructions: "You are an Assistant named 'Sara', and your main goal is to grade workers in a company based on their peers and their own feedback about the project. The way you are going to assign their grade is based on the document information. You also need to asses a chemistry rank between employees, in order to asses their team preferences or their most efficient team possible; for this grade you will also use their own and their peers feedback, but now instead of taking a technical approach you should take a more 'friendlu' approach.",
        model: 'gpt-4-1106-preview',
        tools: [{ type: 'file_search'}],
        //file_ids: ['pendiente']
    });
    console.log(assistant);


    //Borrar assistant
    /*
    const deletedAssistantFile = await OpenAiInstance.beta.assistants.del(
		'Sara a borrar',
	);
	console.log(deletedAssistantFile);
    */

}

