import { fetch_unprocessed_evm_transaction_events, save_backfill_json } from "../logic/event_evm_transaction.logic";
import { construct_evm_backfill_json } from "../core/evm_transaction_backfill.core";
import { is_onchain_transaction_event_type } from "../utils/util_methods";

export async function handle_fetch_unprocessed_evm_transaction_events() {
    return await fetch_unprocessed_evm_transaction_events();
}

//populate the visualization & notification tables as required
export async function handle_process_unprocessed_evm_transaction_events(events: any) {
    try {
        for (let _event of events) {
            await process_evm_transaction_event(_event);
        }
    } catch (e) {
        throw e;
    }
}

// Can be called internally or externally adhoc
export async function process_evm_transaction_event(event: any) {
    if (is_onchain_transaction_event_type(event.event_type)) {
        const backfill_json = await construct_evm_backfill_json(event);
        const backfill_json_str = JSON.stringify(backfill_json);
        await save_backfill_json(event, backfill_json_str);
    }
}