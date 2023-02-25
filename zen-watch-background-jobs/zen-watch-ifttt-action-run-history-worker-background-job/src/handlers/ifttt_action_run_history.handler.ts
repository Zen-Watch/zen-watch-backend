import { handle_ifttt_action_listener_event } from "../core/ifttt_action_listener.core";
import { handle_ifttt_action_onetime_event } from "../core/ifttt_action_onetime.core";
import { fetch_unprocessed_ifttt_action_run_history_events } from "../logic/ifttt_action_run_history.logic";
import { ACTION_LISTENERS } from "../utils/constants";

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
export async function process_ifttt_action_run_history_events(_event: any) {
    if (ACTION_LISTENERS.includes(_event.action_target_resource_name.toLowerCase()))
        await handle_ifttt_action_listener_event(_event);
    else
        await handle_ifttt_action_onetime_event(_event);
}
