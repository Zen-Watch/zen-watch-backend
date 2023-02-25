import { v4 as uuidv4 } from 'uuid';
import { is_onchain_transaction_event_type, get_random_shard_number } from './util_methods';

export function validate_zen_watch_event(event: any) {
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

    if (is_onchain_transaction_event_type(event.event_type)) {
        if (!event.event_properties || !event.event_properties.txn_hash)
            throw new Error('For transaction type, txn_hash must be passed in')
    }

    return attach_event_metadata(event)
}

export function attach_event_metadata(event: any) {
    event.event_id = uuidv4();
    event.api_worker_shard_id = get_random_shard_number();
    return event;
}