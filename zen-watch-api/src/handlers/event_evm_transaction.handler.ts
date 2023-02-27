import { save_evm_transaction_event } from '../logic/event_evm_transaction.logic';
import { INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND, STATUS_OK, STATUS_UNPROCESSABLE_ENTITY } from '../utils/constants';
import { is_onchain_transaction_event_type } from '../utils/util_methods';
import { validate_zen_watch_event } from '../utils/validation.utils';

export async function handle_zen_watch_event(api_key: string, event: any) {
    let valid_event;
    try {
        valid_event = validate_zen_watch_event(event)
    }
    catch (e: any) {
        return { status: STATUS_UNPROCESSABLE_ENTITY, message: e.message };
    }
    if (is_onchain_transaction_event_type(valid_event.event_type)) {
        try {
            await save_evm_transaction_event(api_key, valid_event)
            return { status: STATUS_OK, message: 'OK' };
        } catch (e: any) {
            return { status: INTERNAL_SERVER_ERROR, message: e.message };
        }
    }
    else return { status: STATUS_NOT_FOUND, message: 'Unsupported Operation' }
}