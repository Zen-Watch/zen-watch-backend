import express, { Request, Response } from 'express';
import dotenv from 'dotenv'; 
import { handleZenWatchEvent } from '../handlers/event_evm_transaction.handler';
import { STATUS_OK, X_API_KEY_HEADER } from '../utils/constants';
dotenv.config();

const router = express.Router()

router.get('/healthz', (req, res) => {
    res.status(STATUS_OK).send('hello world!!');
})

router.post('/event', (req:Request, res:Response) => {
    const api_key = req.header(X_API_KEY_HEADER)!
    handleZenWatchEvent(api_key, req.body)
    .then(_res => res.status(_res.status).send(_res))
})

module.exports = router
