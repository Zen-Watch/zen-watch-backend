import dotenv from 'dotenv';
dotenv.config();
import { Configuration, OpenAIApi } from "openai"

let openAi: OpenAIApi | undefined = undefined;

// singleton pattern for connecting to openai, placing under db as I consider openai as an AI db
export async function connect_to_openai() {

    // If the pool was already created, return it instead of creating a new one.
    if (typeof openAi !== 'undefined') {
        return openAi;
    }

    openAi = new OpenAIApi(
        new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        })
    )
    return openAi;
}