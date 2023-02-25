import { execute_ifttt_action_run_history_events } from "../core/ifttt_action_run_history.core";
import { fetch_unprocessed_ifttt_action_run_history_events } from "../logic/ifttt_action_run_history.logic";

export async function handle_fetch_unprocessed_ifttt_action_run_history_events() {
    return await fetch_unprocessed_ifttt_action_run_history_events();
}

// handle the processing of IFTTT action run history events
export async function handle_process_ifttt_action_run_history_events(ifttt_action_run_history_events: any) {
    try {
        for (let ifttt_action_run_history_event of ifttt_action_run_history_events) {
            await process_ifttt_action_run_history_events(ifttt_action_run_history_event);
        }
    } catch (e) {
        throw e;
    }
}

// Can be called internally or externally adhoc
export async function process_ifttt_action_run_history_events(ifttt_action_run_history_event: any) {
    await execute_ifttt_action_run_history_events(ifttt_action_run_history_event);
}
