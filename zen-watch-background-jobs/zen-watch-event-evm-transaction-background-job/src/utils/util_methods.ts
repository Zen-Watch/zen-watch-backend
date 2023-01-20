import { POLYGON_MAINNET_TRANSACTION_EVENT_TYPE, POLYGON_MAINNET, ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE, ETHEREUM_MAINNET } from "./constants";

export function getChainFromEventName(event_name: string) {
    switch (event_name) {
        case POLYGON_MAINNET_TRANSACTION_EVENT_TYPE:
            return POLYGON_MAINNET;
        case ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE:
            return ETHEREUM_MAINNET;
        default:
            return POLYGON_MAINNET;
    }
}