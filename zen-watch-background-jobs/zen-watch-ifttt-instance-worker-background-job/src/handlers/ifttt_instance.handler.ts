import { processIFTTTInstanceTriggerBasedOnPullMechanism, processIFTTTInstanceTriggerBasedOnPushMechanism } from "../core/ifttt_iinstance.core";
import { fetchAllIFTTTInstances } from "../logic/ifttt_instance.logic";

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