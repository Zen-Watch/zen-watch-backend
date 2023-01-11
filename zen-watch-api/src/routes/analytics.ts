import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { getLatestBlock } from '../handlers/alchemy.handler';
import { handleZenWatchEvent } from '../handlers/event.handler';
dotenv.config();

const router = express.Router()

router.get('/healthz', (req, res) => {
    res.status(200).send('hello world!!');
})

router.post('/event', (req:Request, res:Response) => {
    //getLatestBlock().then(console.log);
    const _res = handleZenWatchEvent(req.body) 
    res.status(200).send(_res);
})

module.exports = router
