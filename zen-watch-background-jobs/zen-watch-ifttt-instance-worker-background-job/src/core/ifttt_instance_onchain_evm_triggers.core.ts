import { ethers } from 'ethers';
import { DynamicFunctionLoadingError, ZenWatchTriggerHandler, ifttt_instance_event_listener_map } from '../utils/constants';
import { fetch_ifttt_trigger_definition } from '../logic/ifttt_trigger_definition.logic';
import dotenv from 'dotenv';
import { get_alchemy_provider } from '../utils/util_methods';
dotenv.config();


// load the onchain listener
function load_dynamic_function(provider: ethers.providers.JsonRpcProvider, zenwatch: ZenWatchTriggerHandler, dynamicFunctionCode: any) {
    const dynamicFunction = eval(`(${dynamicFunctionCode})`);
    return (payload: any) => {
        return dynamicFunction(zenwatch, payload, ethers, provider);
    };
}

// turn off onchain listener
function turn_off_onchain_listener(contract: ethers.Contract) {
    console.log('Turning off onchain listener - ', contract);
    contract.removeAllListeners('Transfer');
}


// process the ifttt instance based on the trigger mechanism
export async function handle_ifttt_instance_onchain_evm_trigger(_instance: any) {
    if (_instance.ifttt_instance_is_on) {
        // regular flow, if already on map, skip, else add to mapp and process 
        if (ifttt_instance_event_listener_map.has(_instance.id.toString())) {
            //console.log('Skip IFTTT instance with push mechanism already processed - ', _instance.id.toString());
            return
        }
        else {
            // New instance, add to map and process
            console.log('Turning on IFTTT instance with push mechanism - ', _instance.id.toString());
            const trigger_definition = await fetch_ifttt_trigger_definition(_instance.trigger_info.trigger_id);
            const provider = get_alchemy_provider(trigger_definition.target_resource_name);
            try {
                // Raising a Dynamic Function Loading Error as there is could error in user written dynamic code, which should not bring the system down
                const zenwatch = new ZenWatchTriggerHandler(_instance);
                const _dynamicFunction = load_dynamic_function(provider, zenwatch, decodeURIComponent(trigger_definition.trigger_code));
                //console.log('Created dynamic function params - ', _instance.trigger_info.params)
                const contract = _dynamicFunction(_instance.trigger_info.params);
                //console.log('Created contract - ', contract);
                ifttt_instance_event_listener_map.set(_instance.id.toString(), contract as ethers.Contract);
            } catch (e) {
                console.log('DynamicFunctionLoadingError in loading dynamic function in handle_ifttt_instance_onchain_evm_trigger - ', _instance.id.toString(), e);
                throw new DynamicFunctionLoadingError(`DynamicFunctionLoadingError in loading dynamic function in handle_ifttt_instance_onchain_evm_trigger - ${_instance.id.toString()} - ${e}`);
            }
        }
    } else {
        // the triggger has been turned off, but still is being processed, turn off the listener and remove from the map 
        if (ifttt_instance_event_listener_map.has(_instance.id.toString())) {
            // turn off onchain listener
            console.log('Turning off IFTTT instance with push mechanism - ', _instance.id.toString());
            const contract = ifttt_instance_event_listener_map.get(_instance.id.toString());
            console.log('resolve promise', contract!.then((c: ethers.Contract) => {
                turn_off_onchain_listener(c);
            }));
            // remove from map
            ifttt_instance_event_listener_map.delete(_instance.id.toString());
            console.log('IFTTT instance id deleted / turned off - ', _instance.id.toString(), ifttt_instance_event_listener_map);
            return
        }
    }

}

