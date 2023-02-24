import { ethers } from 'ethers';
import { ZenWatchHandler, ifttt_instance_event_listener_map } from '../utils/constants';
import { fetchIFTTTTriggerDefinition } from '../logic/ifttt_trigger_definition.logic';
import dotenv from 'dotenv';
import { getAlchemyProvider } from '../utils/util_methods';
dotenv.config();


// load the onchain listener
function loadDynamicFunction(provider: ethers.providers.JsonRpcProvider, zenwatch: ZenWatchHandler, dynamicFunctionCode: any) {
    const dynamicFunction = eval(`(${dynamicFunctionCode})`);
    return (params: any) => {
        return dynamicFunction(params.targetAddress, params.contractAddress, ethers, provider, zenwatch);
    };
}

// turn off onchain listener
function turnOffOnchainListener(contract: ethers.Contract) {
    console.log('Turning off onchain listener - ', contract);
    contract.removeAllListeners('Transfer');
}


// process the ifttt instance based on the trigger mechanism
export async function handleIFTTTInstanceTriggerBasedOnOnchainPushMechanism(_instance: any) {
    if (_instance.ifttt_instance_is_on) {
        // regular flow, if already on map, skip, else add to mapp and process 
        if (ifttt_instance_event_listener_map.has(_instance.id.toString())) {
            console.log('Skip IFTTT instance with push mechanism already processed - ', _instance.id.toString());
            return
        }
        else {
            // New instance, add to map and process
            console.log('Turning on IFTTT instance with push mechanism - ', _instance.id.toString());
            const trigger_info = await fetchIFTTTTriggerDefinition(_instance.trigger_info.trigger_id);
            // print trigger info
            const provider = getAlchemyProvider(trigger_info.target_resource_name);
            const zenwatch = new ZenWatchHandler(_instance, trigger_info);
            const _dynamicFunction = loadDynamicFunction(provider, zenwatch, decodeURIComponent(trigger_info.trigger_code));
            const contract = _dynamicFunction(_instance.trigger_info.params);
            console.log('Created contract - ', contract);
            ifttt_instance_event_listener_map.set(_instance.id.toString(), contract as ethers.Contract);
        }
    } else {
        // the triggger has been turned off, but still is being processed, turn off the listener and remove from the map 
        if (ifttt_instance_event_listener_map.has(_instance.id.toString())) {
            // turn off onchain listener
            console.log('Turning off IFTTT instance with push mechanism - ', _instance.id.toString());
            const contract = ifttt_instance_event_listener_map.get(_instance.id.toString());
            console.log('resolve promise', contract!.then((c: ethers.Contract) => {
                turnOffOnchainListener(c);
            }));
            // remove from map
            ifttt_instance_event_listener_map.delete(_instance.id.toString());
            console.log('IFTTT instance id deleted / turned off - ', _instance.id.toString(), ifttt_instance_event_listener_map);
            return
        }
    }

}

