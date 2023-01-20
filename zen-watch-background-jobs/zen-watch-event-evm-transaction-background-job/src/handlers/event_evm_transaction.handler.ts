import { fetchUnprocessedEVMTransactionEvents, saveBackFillJson } from "../logic/event_evm_transaction.logic";
import { ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE, POLYGON_MAINNET_TRANSACTION_EVENT_TYPE } from "../utils/constants";
import { construct_evm_backfill_json } from "../core/evm_transaction_backfill.core";

export async function handleFetchUnprocessedEVMTransactionEvents() {
    return await fetchUnprocessedEVMTransactionEvents();
}

//populate the visualization & notification tables as required
export async function handleProcessUnprocessedEVMTransactionEvents(events: any) {
    try {
        for (let _event of events) {
            await processEVMTransactionEvent(_event);
        }
    } catch (e) {
        throw e;
    }
}

// Can be called internally or externally adhoc
export async function processEVMTransactionEvent(event: any) {
    if (event.event_type === POLYGON_MAINNET_TRANSACTION_EVENT_TYPE || event.event_type === ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE) {
        const backfill_json = await construct_evm_backfill_json(event);
        const backfill_json_str = JSON.stringify(backfill_json);
        await saveBackFillJson(event, backfill_json_str);
    }
}