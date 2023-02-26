
// Worker status
export const IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_FATAL_ERROR = -1;
export const IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_UNPROCESSED = 0;
export const IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_UNDER_PROCESSING = 1;
export const IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_SUCCESS = 2;
export const IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_FAILURE = 3;

// target_resource_name
export const POLYGON_MAINNET = "polygon_mainnet";
export const ETHEREUM_MAINNET = "ethereum_mainnet";
export const REST_API_WEBHOOK = "rest_api_webhook";

// enables advanced actions such as listening & reacting to events constantly, instead of calling an api just once
// action listeners are living in the background and are constantly listening for events, regular listeners are fire and forget
export const WEB2_ACTION_LISTENER = "web2_action_listener";
export const WEB3_ACTION_LISTENER = "web3_action_listener";

// Supported Evm Transaction events
export const ACTION_LISTENERS = [
    WEB3_ACTION_LISTENER,
    WEB2_ACTION_LISTENER,
];

// Custom Error class
export class DynamicFunctionLoadingError extends Error {
    constructor(message: any) {
        super(message);
        this.name = 'DynamicFunctionLoadingError';
    }
}
