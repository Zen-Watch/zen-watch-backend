import { ethers } from "ethers";

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
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_FATAL_ERROR = -1;
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_UNPROCESSED = 0;
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_UNDER_PROCESSING = 1;
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_SUCCESS = 2;
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_FAILURE = 3;

// Custom Error class
export class DynamicFunctionLoadingError extends Error {
    constructor(message: any) {
        super(message);
        this.name = 'DynamicFunctionLoadingError';
    }
}