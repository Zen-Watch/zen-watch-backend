import {v4 as uuidv4} from 'uuid';
import { UNPROCESSED_ENTITY } from './constants';


export function validateZenWatchEvent(event: any) {
    
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

    return attachEventMetadata(event)
}

export function attachEventMetadata(event: any) {
    event.event_id = uuidv4();
    event.status = UNPROCESSED_ENTITY;
    event.backfilled_properties = '';
    return event;
}