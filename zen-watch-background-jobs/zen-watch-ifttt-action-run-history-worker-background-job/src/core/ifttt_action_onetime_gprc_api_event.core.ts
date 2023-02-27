import { fetch_ifttt_action_definition_by_id } from "../logic/ifttt_action_definition.logic";

export async function handle_ifttt_action_onetime_gprc_api_event(ifttt_action_run_history_event: any) {
    console.log("handle_ifttt_action_onetime_gprc_api_event", ifttt_action_run_history_event);
    const action_definition = await fetch_ifttt_action_definition_by_id(ifttt_action_run_history_event.action_run_info.action_id);
    console.log("action_definition", action_definition);
}