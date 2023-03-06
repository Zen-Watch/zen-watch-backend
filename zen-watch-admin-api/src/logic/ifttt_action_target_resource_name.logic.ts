import { connect_to_mysql } from "../db/connection_pool";

export async function create_ifttt_action_target_resource_name_logic(target_resource_name: string, is_onchain: boolean) {
    try {
        const pool = await connect_to_mysql();
        const result: any = await pool!.query(`insert into ifttt_action_target_resource_name (target_resource_name, is_onchain) values (? ,?);`, [target_resource_name, is_onchain]);
        return result[0];
    } catch (e) {
        throw e;
    }
}

export async function fetch_all_action_target_resource_name_logic() {
    try {
        const pool = await connect_to_mysql();
        const result: any = await pool!.query(`select * from ifttt_action_target_resource_name;`);
        return result[0];
    } catch (e) {
        throw e;
    }
}