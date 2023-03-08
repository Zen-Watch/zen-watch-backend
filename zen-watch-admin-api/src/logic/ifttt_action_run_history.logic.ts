import { connect_to_mysql } from "../db/connection_pool";

export async function fetch_ifttt_action_run_history_logic(dev_id: number) {
    try {
        const pool = await connect_to_mysql();
        // fetch all the action run history for the developer
        // write query to stitch together the action run history with the action name from the action table and instance name from the instance table, the action id for action_run_history table is inside the json field action_run_info under the field action_id
        const result: any = await pool!.query(
            `select 
                ifttt_action_run_history.id, 
                ifttt_action_run_history.dev_id, 
                ifttt_action_run_history.action_run_status,
                ifttt_action_run_history.action_run_output,
                ifttt_action_run_history.created_ts, 
                ifttt_action_run_history.updated_ts, 
                ifttt_action_definition.action_name as ifttt_action_name, 
                ifttt_action_definition.target_resource_name as action_target_resource_name, 
                ifttt_instance.ifttt_instance_name as ifttt_instance_name 
            from ifttt_action_run_history 
            inner join ifttt_action_definition 
            on 
                JSON_EXTRACT(ifttt_action_run_history.action_run_info, '$.action_id') = ifttt_action_definition.id
            inner join ifttt_instance 
            on 
                ifttt_action_run_history.ifttt_instance_id = ifttt_instance.id 
            where 
                ifttt_action_run_history.dev_id = ?;`, 
            [dev_id]
        );
        return result[0];
    } catch (e) {
        throw e;
    }
}