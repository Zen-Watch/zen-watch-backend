import { OPENAI_CHATGPT_MODEL, STATUS_NOT_FOUND, STATUS_OK } from "../utils/constants";
import dotenv from 'dotenv';
import { connect_to_openai } from "../db/openai_connection";

dotenv.config();

// https://platform.openai.com/docs/guides/error-codes/api-errors
function handleOpenAIError(error: any) {
    const error_code = error.response.status ?? 500;
    const error_message = error.response?.data?.error?.message ?? error.message;
    // The above code uses the nullish coalescing operator (??) instead of the logical OR (||) operator to check for null or undefined values in the error response. 
    // The nullish coalescing operator only returns the right-hand side if the left-hand side is null or undefined.
    return { status: error_code, message: error_message };
}


// This is a slow, non-streaming function, as OpenAI takes times to compose the full message
// using gpt-3.5-turbo model.
// May be I need to remove this API and move to it's own service, so not to starve the admin dashboard, but this can wait
async function ask_openai(prompt: string) {
    const openAi = await connect_to_openai()
    try {
        const response = await openAi.createChatCompletion({
            model: OPENAI_CHATGPT_MODEL,
            messages: [{ role: "user", content: prompt }],
        }, {
            timeout: 120000 // 120 seconds or 2 minutes timeout
        });
        return { status: response.status, message: response?.data?.choices[0]?.message?.content };
    } catch (error: any) {
        return handleOpenAIError(error);
    }
}

export async function ask_gpt(prompt: string) {
    try {
        const openai_response = await ask_openai(prompt);
        return { status: openai_response.status, message: openai_response.message }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during action definitions fetch. Please contact support@zen.watch' }
    }
}
