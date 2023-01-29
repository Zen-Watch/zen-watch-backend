import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'; 
import { handleZenWatchEvent } from '../handlers/event_evm_transaction.handler';
import { STATUS_OK } from '../utils/constants';
dotenv.config();

const router = express.Router()

router.get('/healthz', (req, res) => {
    res.status(STATUS_OK).send('hello world!!');
})

router.post('/event', (req:Request, res:Response) => {
    handleZenWatchEvent(req.body)
    .then(_res => res.status(_res.status).send(_res))
})

module.exports = router
