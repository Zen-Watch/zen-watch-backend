import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { STATUS_OK } from '../utils/constants';
import { authenticate_dev_email } from './admin.middlewares';
import { create_ifttt_trigger_definition, fetch_trigger_definition_details } from '../handlers/ifttt_trigger_definition.handler';
import { create_ifttt_action_definition, fetch_action_definition_details } from '../handlers/ifttt_action_definition.handler';
import { create_ifttt_instance, fetch_ifttt_instances, update_ifttt_instance_status } from '../handlers/ifttt_instance.handler';
dotenv.config();

const router = express.Router()

router.get('/healthz', (req, res) => {
    res.status(STATUS_OK).send('hello world, ifttt!!');
})

// ------------------------------- Echo Bot API for IFTTT testing ----------------------------

// Echo Bot API for IFTTT testing, echos back the request body
router.post('/test/echo', authenticate_dev_email, (req: Request, res: Response) => {
    res.status(STATUS_OK).send(req.body);
    //res.status(500).send({status: 500, message: 'test error'});
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

// Update ifttt definitions that matches the given criteria to enable/disable the trigger instance
router.post('/update/ifttt_instance/status', authenticate_dev_email, (req: Request, res: Response) => {
    const {email, instance_id, new_instance_status} = req.body
    update_ifttt_instance_status(email, instance_id, new_instance_status)
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
router.post('/fetch/action_definition', authenticate_dev_email, (req: Request, res: Response) => {
    const { email, txn_hashes } = req.body
    const _res = {

    };
    res.status(200).send(req.body)
})

// Fetch ifttt definitions that matches the given criteria
router.post('/fetch/ifttt_instances', authenticate_dev_email, (req: Request, res: Response) => {
    const {email} = req.body
    fetch_ifttt_instances(email)
    .then(_res => res.status(_res.status).send(_res))
})

// Fetch ifttt trigger definitions that matches the given criteria
router.post('/fetch/trigger_definition/details', authenticate_dev_email, (req: Request, res: Response) => {
    const { id } = req.body
    fetch_trigger_definition_details(id)
    .then(_res => res.status(_res.status).send(_res))
})

// Fetch ifttt action definitions that matches the given criteria
router.post('/fetch/action_definition/details', authenticate_dev_email, (req: Request, res: Response) => {
    const { ids } = req.body
    fetch_action_definition_details(ids)
    .then(_res => res.status(_res.status).send(_res))
})


module.exports = router
