import { handle_ifttt_instance_trigger_pull_mechanism } from "../core/ifttt_instance_pull_mechanism.core";
import { handle_ifttt_instance_trigger_onchain_push_mechanism } from "../core/ifttt_instance_onchain_push_mechanism.core";
import { fetch_all_ifttt_instances } from "../logic/ifttt_instance.logic";
import { DynamicFunctionLoadingError, ONCHAIN_PUSH_TRIGGERS } from "../utils/constants";
import { handle_ifttt_instance_trigger_offchain_push_mechanism } from "../core/ifttt_instance_offchain_push_mechanism.core";

export async function handle_fetch_all_ifttt_instances() {
    return await fetch_all_ifttt_instances();
}

//handle the processing of ifttt instances
export async function handle_process_ifttt_instance(ifttt_instances: any) {
    try {
        for (let _instance of ifttt_instances) {
            await process_ifttt_instance(_instance);
        }
    } catch (e) {
        if (e instanceof DynamicFunctionLoadingError) {
            console.error('DynamicFunctionLoadingError caught, logged and moved on', e.message);
        } else {
            // All other errors are surfaced to the caller
            throw e;
        }
    }
}

// Can be called internally or externally adhoc
export async function process_ifttt_instance(_instance: any) {
    if (_instance.is_trigger_push_mechanism)
        await process_ifttt_instance_trigger_based_on_push_mechanism(_instance);
    else
        await process_ifttt_instance_trigger_based_on_pull_mechanism(_instance);
}

// process the ifttt instance based on the pull trigger mechanism
export async function process_ifttt_instance_trigger_based_on_pull_mechanism(_instance: any) {
    await handle_ifttt_instance_trigger_pull_mechanism(_instance);
}

// process the ifttt instance based on the push trigger mechanism
export async function process_ifttt_instance_trigger_based_on_push_mechanism(_instance: any) {
    console.log('Starting', _instance.trigger_target_resource_name, ONCHAIN_PUSH_TRIGGERS);
    if (ONCHAIN_PUSH_TRIGGERS.includes(_instance.trigger_target_resource_name.toLowerCase()))
        await handle_ifttt_instance_trigger_onchain_push_mechanism(_instance);
    else
        await handle_ifttt_instance_trigger_offchain_push_mechanism(_instance);
}