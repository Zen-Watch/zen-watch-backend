import { ethers } from "ethers";
import { save_ifttt_trigger_run_history_payload } from "../logic/ifttt_trigger_run_history.logic";

// the map of event listeners
export const ifttt_instance_event_listener_map = new Map<string, ethers.Contract>();

// target_resource_name
export const POLYGON_MAINNET = "polygon_mainnet";
export const ETHEREUM_MAINNET = "ethereum_mainnet";

// Supported Evm Transaction events
export const ONCHAIN_PUSH_TRIGGERS = [
    POLYGON_MAINNET,
    ETHEREUM_MAINNET,
];

export const ONCHAIN_EVM_TRIGGERS = [
    POLYGON_MAINNET,
    ETHEREUM_MAINNET,
];

// Worker status
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_UNPROCESSED = 0;
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_UNDER_PROCESSING = 1;
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_SUCCESS = 2;
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_FAILURE = 3;

// create a class ZenWatchTriggerHandler 
export class ZenWatchTriggerHandler {

    // DB record of the event
    _event: any;

    constructor(_event: any) {
        this._event = _event;
    }

    handle_trigger = (payload: any) => {
        save_ifttt_trigger_run_history_payload(this._event, payload).then((res: any) => {
            console.log('Trigger run history payload saved - ', res);
        }).catch((err: any) => {
            console.error('Error saving trigger run history payload - ', err);
        });
    }

    handle_error = (error: any) => {
        console.error('Error:', error)
    }
}

// create a class ZenWatchActionHandler 
export class ZenWatchActionHandler {

    // DB record of the event
    _event: any;

    constructor(_event: any) {
        this._event = _event;
    }

    handle_action = (payload: any) => {
        
    }

    handle_error = (error: any) => {
        console.error('Error:', error)
    }
}

// Custom Error class
export class DynamicFunctionLoadingError extends Error {
    constructor(message: any) {
        super(message);
        this.name = 'DynamicFunctionLoadingError';
    }
}