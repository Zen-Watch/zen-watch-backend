import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { STATUS_OK } from '../utils/constants';
import { authenticate_dev_email } from './admin.middlewares';
import { create_ifttt_trigger_definition } from '../handlers/ifttt_trigger_definition.handler';
import { create_ifttt_action_definition } from '../handlers/ifttt_action_definition.handler';
import { create_ifttt_instance } from '../handlers/ifttt_instance.handler';
dotenv.config();

const router = express.Router()

router.get('/healthz', (req, res) => {
    res.status(STATUS_OK).send('hello world, ifttt!!');
})

// ------------------------------- Echo Bot API for IFTTT testing ----------------------------

// Echo Bot API for IFTTT testing, echos back the request body
router.post('/test/echo', authenticate_dev_email, (req: Request, res: Response) => {
    res.status(STATUS_OK).send(req.body);
})

// ------------------------------- Create APIs -----------------------------------------------

// Fetch ifttt trigger definitions that matches the given criteria
router.post('/create/trigger_definition', authenticate_dev_email, (req: Request, res: Response) => {
    create_ifttt_trigger_definition(req.body)
        .then(_res => res.status(_res.status).send(_res))
})

// Fetch ifttt action definitions that matches the given criteria
router.post('/create/action_definition', authenticate_dev_email, (req: Request, res: Response) => {
    create_ifttt_action_definition(req.body)
        .then(_res => res.status(_res.status).send(_res))
})

// Fetch ifttt definitions that matches the given criteria
router.post('/create/ifttt_instance', authenticate_dev_email, (req: Request, res: Response) => {
    create_ifttt_instance(req.body)
        .then(_res => res.status(_res.status).send(_res))
})

// ------------------------------- Read APIs -----------------------------------------------

// Fetch ifttt categories that matches the given criteria
router.post('/fetch/categories', authenticate_dev_email, (req: Request, res: Response) => {
    const { email, txn_hashes } = req.body
    const _res = {

    };
    res.status(200).send(req.body)
})

// Fetch ifttt trigger definitions that matches the given criteria
router.post('/fetch/trigger_definitions', authenticate_dev_email, (req: Request, res: Response) => {
    const { email, txn_hashes } = req.body
    const _res = {

    };
    res.status(200).send(req.body)
})

// Fetch ifttt action definitions that matches the given criteria
router.post('/fetch/action_definitions', authenticate_dev_email, (req: Request, res: Response) => {
    const { email, txn_hashes } = req.body
    const _res = {

    };
    res.status(200).send(req.body)
})

// Fetch ifttt definitions that matches the given criteria
router.post('/fetch/ifttt_definitions', authenticate_dev_email, (req: Request, res: Response) => {
    const { email, txn_hashes } = req.body
    const _res = {

    };
    res.status(200).send(req.body)
})

module.exports = router
