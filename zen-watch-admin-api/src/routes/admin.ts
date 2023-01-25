import express, { Request, Response } from 'express';
import dotenv from 'dotenv'; 
import { STATUS_OK } from '../utils/constants';
import { allow_developer_signup } from '../handlers/developer.handler';
import { fetch_event_evm_transaction_insights, fetch_event_evm_transaction_details } from '../handlers/event_evm_transaction.handler';
dotenv.config();

const router = express.Router()

router.get('/healthz', (req, res) => {
    res.status(STATUS_OK).send('hello world, admin!!');
})

// Check if an email is allowed to sign_up, takes an email
// Checks against the developer db
router.post('/allow_signup', (req:Request, res:Response) => {
    const {email} = req.body
    allow_developer_signup(email)
    .then(_res => res.status(_res.status).send(_res))
})

// Fetch evm transaction that matches the given criteria
// Sort by ascending timestamps
router.post('/fetch/evm_transactions/gas_costs', (req:Request, res:Response) => {
    const {email, lookback_period} = req.body
    fetch_event_evm_transaction_insights(email, lookback_period)
    .then(_res => res.status(_res.status).send(_res))
})

// Fetch event_json, backfill_json details for a transaction_hash
router.post('/fetch/evm_transactions/gas_costs', (req:Request, res:Response) => {
    const {txn_hashes} = req.body
    fetch_event_evm_transaction_details(txn_hashes)
    .then(_res => res.status(_res.status).send(_res))
})

module.exports = router
