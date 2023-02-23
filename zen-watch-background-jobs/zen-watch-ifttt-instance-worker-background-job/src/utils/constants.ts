// the map of event listeners
export const ifttt_instance_event_listener_map = new Map<string, any>();

// target_resource_name
export const POLYGON_MAINNET = "polygon_mainnet";
export const ETHEREUM_MAINNET = "ethereum_mainnet";
export const API_WEBHOOK = "api_webhook";

// Supported Evm Transaction events
export const ONCHAIN_PUSH_TRIGGERS = [
    POLYGON_MAINNET,
    ETHEREUM_MAINNET,
];