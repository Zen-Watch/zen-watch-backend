import { fetchUnprocessedEvents } from "../logic/web2/event.logic";
import { ONCHAIN_TRANSACTION_EVENT_TYPE } from "../utils/constants";

export async function handleFetchUnprocessedEvents() {
    return await fetchUnprocessedEvents();
}

//populate the visualization & notification tables as required
export async function handleProcessUnprocessedEvents(events:any) {
    try {
        for (let _event of events) {
            await processEvent(_event);
        }
    } catch (e) {
        throw e;
    }
}

// Can be called internally or externally adhoc
export async function processEvent(event:any) {
    if (event.event_type === ONCHAIN_TRANSACTION_EVENT_TYPE) {
        // fetch transaction from alchemy
        // if nil or pending, skip - try in next round (this would be optimized further)
        // do the next in a transaction
            // if sucess, calculate the actual cost by calling an external forex api
            // if error, updated error_details (also introduce a flag in event to call out errored)
        // potentially extract additional virtual column indexes out of json in mysql (4096 columns possible)
    }
    console.log(event);
}