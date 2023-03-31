import { connect_to_mysql } from "../db/connection_pool";

export async function fetch_ifttt_trigger_run_history_logic(dev_id: number) {
    try {
        const pool = await connect_to_mysql();
        // fetch all the trigger run history for the developer
        // write query to stitch together the trigger run history with the trigger name from the trigger table and instance name from the instance table, the trigger id for trigger_run_history table is inside the json field trigger_run_info under the field trigger_id
        const result: any = await pool!.query(
            `select 
                ifttt_trigger_run_history.id, 
                ifttt_trigger_run_history.dev_id, 
                ifttt_trigger_run_history.trigger_run_status,
                ifttt_trigger_run_history.trigger_run_info,
                ifttt_trigger_run_history.trigger_run_output,
                ifttt_trigger_run_history.created_ts, 
                ifttt_trigger_run_history.updated_ts, 
                ifttt_trigger_definition.trigger_name as ifttt_trigger_name, 
                ifttt_trigger_definition.target_resource_name as trigger_target_resource_name, 
                ifttt_instance.ifttt_instance_name as ifttt_instance_name 
            from ifttt_trigger_run_history 
            inner join ifttt_trigger_definition 
            on 
                JSON_EXTRACT(ifttt_trigger_run_history.trigger_run_info, '$.trigger_id') = ifttt_trigger_definition.id
            inner join ifttt_instance 
            on 
                ifttt_trigger_run_history.ifttt_instance_id = ifttt_instance.id 
            where 
                ifttt_trigger_run_history.dev_id = ?
            order by ifttt_trigger_run_history.updated_ts desc;`,
            [dev_id]
        );
        return result[0];
    } catch (e) {
        throw e;
    }
}