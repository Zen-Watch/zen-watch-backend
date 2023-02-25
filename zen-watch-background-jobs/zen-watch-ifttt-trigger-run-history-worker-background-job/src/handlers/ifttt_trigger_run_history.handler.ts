import { create_ifttt_action_run_history_events } from "../core/ifttt_trigger_run_history.core";
import { fetch_unprocessed_ifttt_trigger_run_history_events } from "../logic/ifttt_trigger_run_history.logic";

export async function handleFetchUnprocessedIFTTTTriggerRunHistoryEvents() {
    return await fetch_unprocessed_ifttt_trigger_run_history_events();
}

// handle the processing of IFTTT trigger run history events
export async function handleProcessIFTTTTriggerRunHistoryEvents(ifttt_trigger_run_history_events: any) {
    try {
        for (let ifttt_trigger_run_history_event of ifttt_trigger_run_history_events) {
            await processIFTTTTriggerRunHistoryEvents(ifttt_trigger_run_history_event);
        }
    } catch (e) {
        throw e;
    }
}

// Can be called internally or externally adhoc
export async function processIFTTTTriggerRunHistoryEvents(ifttt_trigger_run_history_event: any) {
    await create_ifttt_action_run_history_events(ifttt_trigger_run_history_event);
}