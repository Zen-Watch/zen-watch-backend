import { fetch_ifttt_action_definition_by_id } from "../logic/ifttt_action_definition.logic";
import { DynamicFunctionLoadingError } from "../utils/constants";
import { ZenWatchActionHandler } from "../utils/zen_watch_action_handler";


// load the onchain listener
function load_dynamic_function(zenwatch: ZenWatchActionHandler, dynamicFunctionCode: any) {
    const dynamicFunction = eval(`(${dynamicFunctionCode})`);
    return (payload: any) => {
        return dynamicFunction(zenwatch, payload);
    };
}

export async function handle_ifttt_action_onetime_rest_api_event(ifttt_action_run_history_event: any) {
    console.log("handle_ifttt_action_onetime_rest_api_event", ifttt_action_run_history_event);
    const action_definition = await fetch_ifttt_action_definition_by_id(ifttt_action_run_history_event.action_run_info.action_id);
    console.log("action_definition", action_definition);
    try {
        // Raising a Dynamic Function Loading Error as there is could error in user written dynamic code, which should not bring the system down
        const zenwatch = new ZenWatchActionHandler(ifttt_action_run_history_event);
        const _dynamicFunction = load_dynamic_function(zenwatch, decodeURIComponent(action_definition.action_code));
        console.log('Created dynamic function params - ', ifttt_action_run_history_event.action_run_info);
        _dynamicFunction(ifttt_action_run_history_event.action_run_info).then((result: any) => {
            console.log('Result of dynamic function - ', result);
        }).catch((e: any) => {
            console.log('Error in dynamic function - ', e);
        });
    } catch (e) {
        console.log('DynamicFunctionLoadingError in loading dynamic function in handleIFTTTInstanceactionBasedOnOnchainPushMechanism - ', ifttt_action_run_history_event.id.toString(), e);
        throw new DynamicFunctionLoadingError(`DynamicFunctionLoadingError in loading dynamic function in handleIFTTTInstanceactionBasedOnOnchainPushMechanism - ${ifttt_action_run_history_event.id.toString()} - ${e}`);
    }
}