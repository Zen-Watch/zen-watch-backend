import { SUPPORTED_EVM_TRANSACTION_EVENTS } from './constants';

export function isOnchainTransactionEventType(event_type: any) {
    return SUPPORTED_EVM_TRANSACTION_EVENTS.includes(event_type)
}
