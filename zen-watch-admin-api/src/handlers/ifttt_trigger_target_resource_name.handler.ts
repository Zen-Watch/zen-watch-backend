import { create_ifttt_trigger_target_resource_name_logic, fetch_all_trigger_target_resource_name_logic } from "../logic/ifttt_trigger_target_resource_name.logic";
import { STATUS_NOT_FOUND, STATUS_OK } from "../utils/constants";

export async function create_ifttt_trigger_target_resource_name(target_resource_name: string, is_onchain: boolean) {
    try {
        const row_created = await create_ifttt_trigger_target_resource_name_logic(target_resource_name, is_onchain);
        console.log('row_created', row_created);
        return { status: STATUS_OK, message: 'IFTTT trigger target resource name created' }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during trigger target resource name creation. Please contact support@zen.watch' }
    }
}

export async function fetch_all_trigger_target_resource_name() {
    try {
        const rows = await fetch_all_trigger_target_resource_name_logic();
        return { status: STATUS_OK, message: rows }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during trigger target resource name fetch. Please contact support@zen.watch' }
    }
}