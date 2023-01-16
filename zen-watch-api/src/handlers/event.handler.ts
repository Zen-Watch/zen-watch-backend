import { saveEvent } from '../logic/web2/event.logic';
import { ONCHAIN_TRANSACTION_EVENT_TYPE, STATUS_NOT_FOUND, STATUS_OK, STATUS_UNPROCESSABLE_ENTITY } from '../utils/constants';
import { validateZenWatchEvent } from '../utils/validation.utils';

export async function handleZenWatchEvent(event: any) {
    let valid_event;
    try {
        valid_event = validateZenWatchEvent(event)
    }
    catch(e: any) {
        return {status: STATUS_UNPROCESSABLE_ENTITY, message: e.message} ; 
    }
    if (valid_event.event_type === ONCHAIN_TRANSACTION_EVENT_TYPE) {
        try {
            await saveEvent({
                event_id: valid_event.event_id,
                event_timestamp: valid_event.event_timestamp,
                event_type: valid_event.event_type,
                api_key: valid_event.api_key,
                environment_details: valid_event.environment_details,
                event_properties: valid_event.event_properties,
                wallet_address: valid_event.wallet_address,
                wallet_properties: valid_event.wallet_properties,
                status: valid_event.status,
                backfilled_properties: valid_event.backfilled_properties,
            })
            return {status: STATUS_OK, message: 'OK'};
        } catch (e:any) {
            return {status: STATUS_UNPROCESSABLE_ENTITY, message: e.message} ;
        }
    }
    else return {status: STATUS_NOT_FOUND, message: 'Unsupported Operation'}
}