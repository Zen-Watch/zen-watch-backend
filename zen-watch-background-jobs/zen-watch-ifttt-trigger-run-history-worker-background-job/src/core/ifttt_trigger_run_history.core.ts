import { fetch_ifttt_action_definition_by_id } from "../logic/ifttt_action_definition.logic";
import { create_new_action_events_in_a_transaction } from "../logic/ifttt_action_run_history.logic";
import { fetch_actions_info_from_ifttt_instance_by_id } from "../logic/ifttt_instance.logic";
import { update_ifttt_trigger_run_history_status } from "../logic/ifttt_trigger_run_history.logic";
import { IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_UNPROCESSED, TRIGGER_RUN_HISTORY_WORKER_STATUS_FAILURE, TRIGGER_RUN_HISTORY_WORKER_STATUS_SUCCESS } from "../utils/constants";
import { getRandomShardNumber } from "../utils/util_methods";

export async function create_ifttt_action_run_history_events(ifttt_trigger_run_history_event: any) {
    const new_actions = await prepare_new_actions_package(ifttt_trigger_run_history_event);
    const is_transaction_success = await create_new_action_events_in_a_transaction(new_actions);
    console.log("is_transaction_success: ", is_transaction_success);
    if (is_transaction_success) {
        // update the trigger run history status to success
        await update_ifttt_trigger_run_history_status(ifttt_trigger_run_history_event.id, TRIGGER_RUN_HISTORY_WORKER_STATUS_SUCCESS);
    } else {
        // update the trigger run history status to failure
        await update_ifttt_trigger_run_history_status(ifttt_trigger_run_history_event.id, TRIGGER_RUN_HISTORY_WORKER_STATUS_FAILURE);
    }
}

// We prepare the package ahead of time to reduce the db locking time during the transaction execution
async function prepare_new_actions_package(ifttt_trigger_run_history_event: any) {
    let actions_to_run: any[] = [];

    const ifttt_instance_action_info_obj = await fetch_actions_info_from_ifttt_instance_by_id(ifttt_trigger_run_history_event.ifttt_instance_id);
    for (let action_info of ifttt_instance_action_info_obj.actions_info) {
        // merge the trigger run output with the action info
        const merged_actions_info = Object.assign(action_info, ifttt_trigger_run_history_event.trigger_run_output);

        // fetch action object by id
        const action_definition = await fetch_ifttt_action_definition_by_id(action_info.action_id);

        // prepare the new_action object and add it to the output array
        const new_action = {
            ifttt_action_run_history_worker_shard_id: getRandomShardNumber(Number(process.env.IFTTT_ACTION_RUN_HISTORY_WORKER_SHARDS)),
            dev_id: ifttt_trigger_run_history_event.dev_id,
            ifttt_instance_id: ifttt_trigger_run_history_event.ifttt_instance_id,
            ifttt_trigger_run_history_id: ifttt_trigger_run_history_event.id,
            is_action_trusted_source: action_definition.is_trusted_source,
            is_action_compute_intensive: action_definition.is_compute_intensive,
            action_target_resource_name: action_definition.target_resource_name,
            action_run_status: IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_UNPROCESSED,
            action_run_info: merged_actions_info,
        }
        actions_to_run.push(new_action);
    }

    return actions_to_run;
}

