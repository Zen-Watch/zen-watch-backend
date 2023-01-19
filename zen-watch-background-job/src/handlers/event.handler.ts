import { fetchUnprocessedEvents, saveBackFillJson } from "../logic/event.logic";
import { POLYGON_MAINNET_TRANSACTION_EVENT_TYPE } from "../utils/constants";
import { construct_evm_backfill_json } from "../core/evm_transaction_backfill.core";

export async function handleFetchUnprocessedEvents() {
    return await fetchUnprocessedEvents();
}

//populate the visualization & notification tables as required
export async function handleProcessUnprocessedEvents(events: any) {
    try {
        for (let _event of events) {
            await processEvent(_event);
        }
    } catch (e) {
        throw e;
    }
}

// Can be called internally or externally adhoc
export async function processEvent(event: any) {
    if (event.event_type === POLYGON_MAINNET_TRANSACTION_EVENT_TYPE) {
        const backfill_json = await construct_evm_backfill_json(event);
        const backfill_json_str = JSON.stringify(backfill_json);
        await saveBackFillJson(event, backfill_json_str);
        // potentially extract additional virtual column indexes out of json in mysql (4096 columns possible)
        // Add PM2 to manage the process
    }
}