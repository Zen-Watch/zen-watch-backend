import { ONCHAIN_EVM_TRIGGERS } from "../utils/constants";
import { handle_ifttt_instance_onchain_evm_trigger } from "./ifttt_instance_onchain_evm_triggers.core";

export async function handle_ifttt_instance_onchain_push_trigger(_instance: any) {
    if (ONCHAIN_EVM_TRIGGERS.includes(_instance.trigger_target_resource_name.toLowerCase())) 
        await handle_ifttt_instance_onchain_evm_trigger(_instance);
    else
        console.log('Unsupported trigger_target_resource_name for on chain push mechanism - ', _instance);
}