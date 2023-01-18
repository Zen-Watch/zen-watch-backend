import { fetchUnprocessedEvents } from "../logic/web2/event.logic";
import { ONCHAIN_TRANSACTION_EVENT_TYPE } from "../utils/constants";
import { getBlockByHash, getTransactionByHash, getTransactionReceiptByHash } from "./alchemy.handler";
import { writeFile } from 'fs';

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
    if (event.event_type === ONCHAIN_TRANSACTION_EVENT_TYPE) {
        // fetch transaction from alchemy
        const receipt = await getTransactionByHash(event.event_json.event_properties.chain, event.event_json.event_properties.txn_hash)
        const receipt_str = JSON.stringify(receipt);

        // if nil or pending, skip - try in next round (this would be optimized further)
        if (receipt === null) {
            // If transaction has been stuck for > 1min, notify developer
            //TODO - Implement later
            console.log('RECEIPT NULL - ', event.event_json.event_properties.txn_hash);
        }
        else {
            // do the next in a transaction
            //console.log('RECEIPT NOT-NULL - ', event.event_json.event_properties.txn_hash, receipt);
            // if sucess, calculate the actual cost by calling an external forex api
            // if error, updated error_details (also introduce a flag in event to call out errored)
            // writeFile(event.event_json.event_properties.txn_hash + ".json", receipt_str,
            //     (err:any) => {
            //         if (err)
            //             console.log(err);
            //         else {
            //             console.log("File written successfully\n");
            //         }
            //     });

        }
        // potentially extract additional virtual column indexes out of json in mysql (4096 columns possible)
        // Add PM2 to manage the process
    }
}