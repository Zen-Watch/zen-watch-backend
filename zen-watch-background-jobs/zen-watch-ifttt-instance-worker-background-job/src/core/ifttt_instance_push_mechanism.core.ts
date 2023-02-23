import { ethers } from 'ethers';
import { ifttt_instance_event_listener_map } from '../utils/constants';
import { fetchIFTTTTriggerDefinition } from '../logic/ifttt_trigger_definition.logic';
import dotenv from 'dotenv';
import { getAlchemyProvider } from '../utils/util_methods';
dotenv.config();

type ZenWatchHandlers = {
    handleTrigger: (eventData: any) => void;
    handleError: (error: any) => void;
};

// the injected handler from zen_watch
const zenwatch: ZenWatchHandlers = {
    handleTrigger: (eventData: any) => {
        const info = {
            from: eventData.from,
            to: eventData.to,
            value: Number(eventData.value),
        }
        console.log('Triggered with data - ', info);
    },
    handleError: (error: any) => console.error('Error:', error),
};

function loadDynamicFunction(provider: ethers.providers.JsonRpcProvider, zenwatch: ZenWatchHandlers, dynamicFunctionCode: any) {
    const dynamicFunction = eval(`(${dynamicFunctionCode})`);
    return (params: any) => {
        return dynamicFunction(params.targetAddress, params.contractAddress, ethers, provider, zenwatch);
    };
}

// process the ifttt instance based on the trigger mechanism
export async function handleIFTTTInstanceTriggerBasedOnPushMechanism(_instance: any) {
    if (ifttt_instance_event_listener_map.has(_instance.id.toString())) {
        console.log('IFTTT instance with push mechanism already processed - '); 
        return 
    }
    else {
        ifttt_instance_event_listener_map.set(_instance.id.toString(), {});
        console.log('Processing IFTTT instance with push mechanism - ', _instance);
        const trigger_info = await fetchIFTTTTriggerDefinition(_instance.trigger_info.trigger_id);
        // print trigger info
        console.log('Trigger info - ', trigger_info);
        console.log('Trigger info - trigger code', trigger_info.trigger_code);
        console.log('Trigger info - params', _instance.trigger_info.params);
        const provider = getAlchemyProvider(trigger_info.target_resource_name);
        const _dynamicFunction = loadDynamicFunction(provider, zenwatch, decodeURIComponent(trigger_info.trigger_code));
        const contract = _dynamicFunction(_instance.trigger_info.params);
        console.log('Contract - ', contract);
        ifttt_instance_event_listener_map.set(_instance.id.toString(), contract);
    }     
}

