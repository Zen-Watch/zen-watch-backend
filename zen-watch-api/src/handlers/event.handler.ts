import { saveEvent } from '../logic/event.logic';
import { INTERNAL_SERVER_ERROR, POLYGON_MAINNET_TRANSACTION_EVENT_TYPE, STATUS_NOT_FOUND, STATUS_OK, STATUS_UNPROCESSABLE_ENTITY } from '../utils/constants';
import { validateZenWatchEvent } from '../utils/validation.utils';

export async function handleZenWatchEvent(event: any) {
    let valid_event;
    try {
        valid_event = validateZenWatchEvent(event)
    }
    catch(e: any) {
        return {status: STATUS_UNPROCESSABLE_ENTITY, message: e.message} ; 
    }
    if (valid_event.event_type === POLYGON_MAINNET_TRANSACTION_EVENT_TYPE) {
        try {
            await saveEvent(valid_event)
            return {status: STATUS_OK, message: 'OK'};
        } catch (e:any) {
            return {status: INTERNAL_SERVER_ERROR, message: e.message} ;
        }
    }
    else return {status: STATUS_NOT_FOUND, message: 'Unsupported Operation'}
}