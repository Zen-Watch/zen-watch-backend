import { ethers } from "ethers";
import { saveTriggerPayload } from "../logic/ifttt_trigger_run_history.logic";

// the map of event listeners
export const ifttt_instance_event_listener_map = new Map<string, ethers.Contract>();

// target_resource_name
export const POLYGON_MAINNET = "polygon_mainnet";
export const ETHEREUM_MAINNET = "ethereum_mainnet";
export const API_WEBHOOK = "api_webhook";

// Supported Evm Transaction events
export const ONCHAIN_PUSH_TRIGGERS = [
    POLYGON_MAINNET,
    ETHEREUM_MAINNET,
];

// Worker status
export const TRIGGER_RUN_HISTORY_WORKER_STATUS_UNPROCESSED=0;
export const TRIGGER_RUN_HISTORY_WORKER_STATUS_FAILURE=1;
export const TRIGGER_RUN_HISTORY_WORKER_STATUS_SUCCESS=2;

// create a class ZenWatchHandler
export class ZenWatchHandler {

    payload: any;
    instance: any;
    trigger_info: any;

    constructor (instance: any, trigger_info: any) {
        this.instance = instance;
        this.trigger_info = trigger_info;   
    }

    handleTrigger = (payload: any) => { 
        this.payload = payload;
        saveTriggerPayload(this.instance, this.trigger_info, this.payload).then((res: any) => {
            console.log('Trigger payload saved - ', res);
        }).catch((err: any) => {
            console.error('Error saving trigger payload - ', err);
        });
    }

    handleError = (error: any) => {
        console.error('Error:', error)
    }
}