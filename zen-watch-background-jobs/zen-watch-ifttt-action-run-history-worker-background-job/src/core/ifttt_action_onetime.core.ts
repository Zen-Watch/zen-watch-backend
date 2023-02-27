import { fetch_ifttt_action_definition_by_id } from "../logic/ifttt_action_definition.logic";
import { DynamicFunctionLoadingError, REST_API_WEBHOOK } from "../utils/constants";
import { handle_ifttt_action_onetime_rest_api_event } from "./ifttt_action_onetime_rest_api_event.core";

export async function handle_ifttt_action_onetime_event(ifttt_action_run_history_event: any) {
    console.log("handle_ifttt_action_onetime_event", ifttt_action_run_history_event);
    switch(ifttt_action_run_history_event.action_target_resource_name.toLowerCase()) {
        case REST_API_WEBHOOK:
            try {
                await handle_ifttt_action_onetime_rest_api_event(ifttt_action_run_history_event);
            } catch (e) {
                if (e instanceof DynamicFunctionLoadingError) {
                    console.error('DynamicFunctionLoadingError caught, logged and moved on in ifttt_action_onetime.core.handle_ifttt_action_onetime_event', e.message);
                } else {
                    // All other errors are surfaced to the caller
                    throw e;
                }
            }
            break;
        
        default:
            throw new Error(`Unsupported action_target_resource_name in handle_ifttt_action_onetime_event: ${ifttt_action_run_history_event.action_target_resource_name}`);
    }
}