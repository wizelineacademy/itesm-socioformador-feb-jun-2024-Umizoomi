import { config } from "dotenv";
import OpenAI from 'openai';
import { GPTKey } from './config';
config();

const OpenAiInstance = new OpenAI({ apiKey: GPTKey });

export {OpenAiInstance};