import { v4 as uuidv4 } from 'uuid';
import { ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE, POLYGON_MAINNET_TRANSACTION_EVENT_TYPE } from './constants';


export function validateZenWatchEvent(event: any) {
    if (event == '')
        throw new Error('The event must be a valid JSON');

    try {
        JSON.stringify(event)
    } catch (e) {
        throw new Error('The event must be a valid JSON')
    }

    if (event.environment_details == '')
        throw new Error('environment_details must be a valid JSON');

    try {
        JSON.stringify(event.environment_details)
    } catch (e) {
        throw new Error('environment_details must be a valid JSON')
    }

    if (event.event_properties == '')
        throw new Error('event_properties must be a valid JSON')

    try {
        JSON.stringify(event.event_properties)
    } catch (e: any) {
        throw new Error('event_properties must be a valid JSON')
    }

    if (event.wallet_properties == '')
        throw new Error('wallet_properties must be a valid JSON')

    try {
        JSON.stringify(event.wallet_properties)
    } catch (e: any) {
        throw new Error('wallet_properties must be a valid JSON')
    }

    if (event.event_type == POLYGON_MAINNET_TRANSACTION_EVENT_TYPE || event.event_type == ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE) {
        if (!event.event_properties || !event.event_properties.txn_hash)
            throw new Error('For transaction type, txn_hash must be passed in')
    }

    return attachEventMetadata(event)
}

export function attachEventMetadata(event: any) {
    event.event_id = uuidv4();
    return event;
}