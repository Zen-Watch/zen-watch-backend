import { connect_to_mysql } from "../db/connection_pool";
import { get_random_shard_number } from "../utils/util_methods";
import dotenv from 'dotenv';
dotenv.config();

export async function create_ifttt_trigger_run_history_event(instance: any, status: number, payload: any) {
    console.log('Saving trigger run history payload saved - ');
    const pool = await connect_to_mysql()

    let trigger_run_output: string = "";
    try {
        try {
            // If it's an object, it will convert
            trigger_run_output = JSON.stringify(payload)
            console.log('payload is object - ');
        }
        catch (e) {
            // If its a type that has a to_string, it will converted here
            console.log('payload conversion error in JSON.stringify, trying .toString - ', e);
            trigger_run_output = payload.toString();
        }
    }
    catch (e) {
        console.log('payload conversion error with toString as well - ', e);
        trigger_run_output = `Unsupported payload type in trigger callback. Debug to learn more.`;    
    }

    const ifttt_trigger_run_history_worker_shard_id = get_random_shard_number(Number(process.env.IFTTT_TRIGGER_RUN_HISTORY_WORKER_SHARDS));
    const dev_id = instance.dev_id;
    const is_trigger_trusted_source = instance.is_trigger_trusted_source;
    const is_trigger_compute_intensive = instance.is_trigger_compute_intensive;
    const is_trigger_push_mechanism = instance.is_trigger_push_mechanism;
    const trigger_target_resource_name = instance.trigger_target_resource_name;
    const ifttt_instance_id = instance.id;
    const trigger_run_status = status;
    const trigger_run_info = JSON.stringify(instance.trigger_info)

    // insert into ifttt_trigger_run_history
    const result: any = await pool!.query(
        `insert into ifttt_trigger_run_history (
            ifttt_trigger_run_history_worker_shard_id,
            dev_id,
            is_trigger_trusted_source,
            is_trigger_compute_intensive,
            is_trigger_push_mechanism,
            trigger_target_resource_name,
            ifttt_instance_id,
            trigger_run_status,
            trigger_run_info,
            trigger_run_output
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
            ifttt_trigger_run_history_worker_shard_id,
            dev_id,
            is_trigger_trusted_source,
            is_trigger_compute_intensive,
            is_trigger_push_mechanism,
            trigger_target_resource_name,
            ifttt_instance_id,
            trigger_run_status,
            trigger_run_info,
            trigger_run_output,
        ]
    );

    return result[0];
}