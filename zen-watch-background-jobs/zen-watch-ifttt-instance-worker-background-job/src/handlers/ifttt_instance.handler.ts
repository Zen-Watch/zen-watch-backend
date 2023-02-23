import { handleIFTTTInstanceTriggerBasedOnPullMechanism } from "../core/ifttt_instance_pull_mechanism.core";
import { handleIFTTTInstanceTriggerBasedOnOnchainPushMechanism } from "../core/ifttt_instance_onchain_push_mechanism.core";
import { fetchAllIFTTTInstances } from "../logic/ifttt_instance.logic";
import { ONCHAIN_PUSH_TRIGGERS } from "../utils/constants";
import { handleIFTTTInstanceTriggerBasedOnOffchainPushMechanism } from "../core/ifttt_instance_offchain_push_mechanism.core";

export async function handleFetchAllIFTTTInstances() {
    return await fetchAllIFTTTInstances();
}

//handle the processing of ifttt instances
export async function handleProcessIFTTTInstance(ifttt_instances: any) {
    try {
        for (let _instance of ifttt_instances) {
            await processIFTTTInstance(_instance);
        }
    } catch (e) {
        throw e;
    }
}

// Can be called internally or externally adhoc
export async function processIFTTTInstance(_instance: any) {
    if (_instance.is_trigger_push_mechanism)
        await processIFTTTInstanceTriggerBasedOnPushMechanism(_instance);
    else
        await processIFTTTInstanceTriggerBasedOnPullMechanism(_instance);
}

// process the ifttt instance based on the pull trigger mechanism
export async function processIFTTTInstanceTriggerBasedOnPullMechanism(_instance: any) {
    await handleIFTTTInstanceTriggerBasedOnPullMechanism(_instance);
}

// process the ifttt instance based on the push trigger mechanism
export async function processIFTTTInstanceTriggerBasedOnPushMechanism(_instance: any) {
    console.log('Starting', _instance.trigger_target_resource_name, ONCHAIN_PUSH_TRIGGERS);
    if (ONCHAIN_PUSH_TRIGGERS.includes(_instance.trigger_target_resource_name.toLowerCase()))
        await handleIFTTTInstanceTriggerBasedOnOnchainPushMechanism(_instance);
    else    
        await handleIFTTTInstanceTriggerBasedOnOffchainPushMechanism(_instance);
}