import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getLatestBlock } from '../web3/alchemy';
dotenv.config();

const router = express.Router()

router.get('/healthz', (req, res) => {
    res.status(200).send('hello world!!');
})

router.post('/event', (req:Request, res:Response) => {
    const resp_json = {
        'request': req.body
    }
    getLatestBlock().then(console.log);
      
    res.status(200).send(resp_json);
})

module.exports = router
