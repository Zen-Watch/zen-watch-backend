import express, { Request, Response } from 'express';
import dotenv from 'dotenv'; 
import { handleZenWatchEvent } from '../handlers/event_evm_transaction.handler';
import { STATUS_OK } from '../utils/constants';
dotenv.config();

const router = express.Router()

router.get('/healthz', (req, res) => {
    res.status(STATUS_OK).send('hello world, admin!!');
})

module.exports = router
