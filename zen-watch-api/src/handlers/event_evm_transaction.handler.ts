import { saveEVMTransactionEvent } from '../logic/event_evm_transaction.logic';
import { INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND, STATUS_OK, STATUS_UNPROCESSABLE_ENTITY } from '../utils/constants';
import { isOnchainTransactionEventType } from '../utils/util_methods';
import { validateZenWatchEvent } from '../utils/validation.utils';

export async function handleZenWatchEvent(api_key: string, event: any) {
    let valid_event;
    try {
        valid_event = validateZenWatchEvent(event)
    }
    catch (e: any) {
        return { status: STATUS_UNPROCESSABLE_ENTITY, message: e.message };
    }
    if (isOnchainTransactionEventType(valid_event.event_type)) {
        try {
            await saveEVMTransactionEvent(api_key, valid_event)
            return { status: STATUS_OK, message: 'OK' };
        } catch (e: any) {
            return { status: INTERNAL_SERVER_ERROR, message: e.message };
        }
    }
    else return { status: STATUS_NOT_FOUND, message: 'Unsupported Operation' }
}