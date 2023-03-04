import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { STATUS_OK } from '../utils/constants';
import { authenticate_dev_email } from './admin.middlewares';
import { create_ifttt_trigger_definition, fetch_ifttt_public_approved_trigger_definitions, fetch_trigger_definition_details, fetch_unique_ifttt_target_resource_names_for_public_triggers } from '../handlers/ifttt_trigger_definition.handler';
import { create_ifttt_action_definition, fetch_action_definition_details, fetch_ifttt_public_approved_action_definitions, fetch_unique_ifttt_target_resource_names_for_public_actions } from '../handlers/ifttt_action_definition.handler';
import { create_ifttt_instance, fetch_ifttt_instances, update_ifttt_instance_status } from '../handlers/ifttt_instance.handler';
import { fetch_ifttt_trigger_run_history } from '../handlers/ifttt_trigger_run_history.handler';
import { fetch_ifttt_action_run_history } from '../handlers/ifttt_action_run_history.handler';
import { create_ifttt_trigger_target_resource_name, fetch_all_trigger_target_resource_name } from '../handlers/ifttt_trigger_target_resource_name.handler';
import { create_ifttt_action_target_resource_name, fetch_all_action_target_resource_name } from '../handlers/ifttt_action_target_resource_name.handler';
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

// Create ifttt trigger target resource name
router.post('/create/trigger_target_resource_name', authenticate_dev_email, (req: Request, res: Response) => {
    const {target_resource_name, is_onchain} = req.body
    create_ifttt_trigger_target_resource_name(target_resource_name, is_onchain)
        .then(_res => res.status(_res.status).send(_res))
})

// Create ifttt action target resource name
router.post('/create/action_target_resource_name', authenticate_dev_email, (req: Request, res: Response) => {
    const {target_resource_name, is_onchain} = req.body
    create_ifttt_action_target_resource_name(target_resource_name, is_onchain)
        .then(_res => res.status(_res.status).send(_res))
})

// ------------------------------- Read APIs -----------------------------------------------

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

// Fetch unique ifttt trigger resource names from the system
router.post('/fetch/unique/public/trigger/target_resource_names', authenticate_dev_email, (req: Request, res: Response) => {
    fetch_unique_ifttt_target_resource_names_for_public_triggers()
    .then(_res => res.status(_res.status).send(_res))
})

// Fetch unique ifttt action resource names from the system
router.post('/fetch/unique/public/action/target_resource_names', authenticate_dev_email, (req: Request, res: Response) => {
    fetch_unique_ifttt_target_resource_names_for_public_actions()
    .then(_res => res.status(_res.status).send(_res))
})

// Fetch ifttt trigger definitions that matches the given criteria
router.post('/fetch/public/approved/trigger_definitions', authenticate_dev_email, (req: Request, res: Response) => {
    const { email, target_resource_name } = req.body
    fetch_ifttt_public_approved_trigger_definitions(target_resource_name)
    .then(_res => res.status(_res.status).send(_res))
})

// Fetch ifttt action definitions that matches the given criteria
router.post('/fetch/public/approved/action_definitions', authenticate_dev_email, (req: Request, res: Response) => {
    const { email, target_resource_name } = req.body
    fetch_ifttt_public_approved_action_definitions(target_resource_name)
    .then(_res => res.status(_res.status).send(_res))
})

// Fetch ifttt trigger run history that matches the given criteria
router.post('/fetch/ifttt_trigger_run_history', authenticate_dev_email, (req: Request, res: Response) => {
    const {email} = req.body
    fetch_ifttt_trigger_run_history(email)
    .then(_res => res.status(_res.status).send(_res))
})

// Fetch ifttt action run history that matches the given criteria
router.post('/fetch/ifttt_action_run_history', authenticate_dev_email, (req: Request, res: Response) => {
    const {email} = req.body
    fetch_ifttt_action_run_history(email)
    .then(_res => res.status(_res.status).send(_res))
})

// Fetch ifttt trigger target resource names that matches the given criteria
router.post('/fetch/trigger_target_resource_name', authenticate_dev_email, (req: Request, res: Response) => {
    fetch_all_trigger_target_resource_name()
    .then(_res => res.status(_res.status).send(_res))
})

// Fetch ifttt action target resource names that matches the given criteria
router.post('/fetch/action_target_resource_name', authenticate_dev_email, (req: Request, res: Response) => {
    fetch_all_action_target_resource_name()
    .then(_res => res.status(_res.status).send(_res))
})


module.exports = router
