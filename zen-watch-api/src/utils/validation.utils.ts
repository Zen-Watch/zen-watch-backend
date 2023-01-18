import {v4 as uuidv4} from 'uuid';
import { ONCHAIN_TRANSACTION_EVENT_TYPE, UNPROCESSED_ENTITY } from './constants';


export function validateZenWatchEvent(event: any) {    
    if (event == '')
        throw new Error('The event must be a valid JSON');

    try {
        JSON.stringify(event)
    } catch(e) {
        throw new Error('The event must be a valid JSON')
    }

    if (event.environment_details == '')
        throw new Error('environment_details must be a valid JSON');
    
    try {
        JSON.stringify(event.environment_details)
    } catch(e) {
        throw new Error('environment_details must be a valid JSON')
    }

    if (event.event_properties == '')
        throw new Error('event_properties must be a valid JSON')

    try {
        JSON.stringify(event.event_properties)
    } catch(e:any) {
        throw new Error('event_properties must be a valid JSON')
    }

    if (event.wallet_properties == '')
        throw new Error('wallet_properties must be a valid JSON')

    try {
        JSON.stringify(event.wallet_properties)
    } catch(e:any) {
        throw new Error('wallet_properties must be a valid JSON')
    }

    if (event.event_type == ONCHAIN_TRANSACTION_EVENT_TYPE) {
        if (!event.event_properties || !event.event_properties.chain || !event.event_properties.txn_hash)
            throw new Error('For onchain_transaction type, chain and txn_hash must be passed in')
    }

    return attachEventMetadata(event)
}

export function attachEventMetadata(event: any) {
    event.event_id = uuidv4();
    return event;
}