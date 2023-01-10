import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getLatestBlock } from '../web3/alchemy';
dotenv.config();

const router = express.Router()

router.get('/healthz', (req, res) => {
    res.send('hello world!')
})

router.post('/event', (req, res) => {
    const transaction_hash = req.body.hash
    const resp_json = {
        transaction_hash
    }
    getLatestBlock().then(console.log)
      
    res.status(200).send(resp_json)
})

module.exports = router
