import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { STATUS_OK } from '../utils/constants';
import { authenticate_dev_email } from './admin.middlewares';
import { create_ifttt_category } from '../handlers/ifttt_category.handler';
import { create_ifttt_trigger_definition } from '../handlers/ifttt_trigger_definition.handler';
import { create_ifttt_action_definition } from '../handlers/ifttt_action_definition.handler';
dotenv.config();

const router = express.Router()

router.get('/healthz', (req, res) => {
    res.status(STATUS_OK).send('hello world, ifttt!!');
})

// ------------------------------- Create APIs -----------------------------------------------

// Fetch ifttt categories that matches the given criteria
router.post('/create/category', authenticate_dev_email, (req: Request, res: Response) => {
    const { categ_name, is_onchain } = req.body
    create_ifttt_category(categ_name, is_onchain)
        .then(_res => res.status(_res.status).send(_res))
})

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
    const { email } = req.body
    const _res = {
        email,
    };
    res.status(200).send(req.body)
})

// Fetch ifttt run history that matches the given criteria
router.post('/create/ifttt_run_history', authenticate_dev_email, (req: Request, res: Response) => {
    const { email } = req.body
    const _res = {
        email,
    };
    res.status(200).send(req.body)
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

// Fetch ifttt run history that matches the given criteria
router.post('/fetch/ifttt_run_history', authenticate_dev_email, (req: Request, res: Response) => {
    const { email, txn_hashes } = req.body
    const _res = {

    };
    res.status(200).send(req.body)
})

module.exports = router
