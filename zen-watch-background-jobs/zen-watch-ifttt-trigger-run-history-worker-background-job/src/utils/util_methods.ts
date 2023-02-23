import { POLYGON_MAINNET_TRANSACTION_EVENT_TYPE, POLYGON_MAINNET, ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE, ETHEREUM_MAINNET, USD, INR, SUPPORTED_EVM_TRANSACTION_EVENTS } from "./constants";

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

export function setAppExchangeCurrency(app_exchange_currency: string) {
    if (app_exchange_currency === undefined || app_exchange_currency === null)
        return USD;
    switch (app_exchange_currency.toUpperCase()) {
        case USD:
            return USD;
        case INR:
            return INR;
        default:
            return USD;
    }
}

export function isOnchainTransactionEventType(event_type: any) {
    return SUPPORTED_EVM_TRANSACTION_EVENTS.includes(event_type)
}