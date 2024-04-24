import { config } from "dotenv";


config();

const GPTKey = process.env.OpenAiKey || '';

export { GPTKey }; //exportamos la key de Open Ai para usarla en código con .env