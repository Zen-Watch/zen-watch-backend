import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { PassThrough } from 'stream';
import { STATUS_OK } from '../utils/constants';
import { authenticate_dev_email } from './admin.middlewares';

dotenv.config();

const router = express.Router()

router.get('/healthz', (req, res) => {
    res.status(STATUS_OK).send('hello world, ifttt!!');
})

// ------------------------------- Streaming APIs -----------------------------------------------

router.post("/stream/chatgpt", authenticate_dev_email, async (req: Request, res: Response) => {
    console.log('streaming chatgpt')
    const url = 'https://api.openai.com/v1/completions';

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY!}`,
        "OpenAI-Organization": `${process.env.OPENAI_ORGANIZATION_ID!}`
    };

    const body = JSON.stringify({
        model: 'gpt-3.5-turbo',
        prompt: 'Translate the following English text to French: "{Hello World!}"',
        n: 1,
        echo: true,
        stop: null,
        temperature: 0.8,
    });

    try {
        const nodeFetch = await import('node-fetch');
        const response = await nodeFetch.default(url, {
            method: 'POST',
            headers,
            body,
        });


        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();

        if (response.body !== null) {
            response.body.pipe(new PassThrough({ encoding: 'utf-8' })).pipe(res);
        } else {
            res.end();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing the request.');
    }
});


module.exports = router
