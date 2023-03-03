import { create_ifttt_trigger_definition_logic, fetch_ifttt_public_trigger_definitions_logic, fetch_trigger_definition_details_logic, fetch_unique_ifttt_target_resource_names_for_public_triggers_logic } from "../logic/ifttt_trigger_definition.logic";
import { STATUS_NOT_FOUND, STATUS_OK } from "../utils/constants";
import dotenv from 'dotenv';
import { get_developer_by_email_from_cache } from "../cache/developer.cache";
dotenv.config();

export async function create_ifttt_trigger_definition(payload: any) {
    try {
        const dev = await get_developer_by_email_from_cache(payload.email);
        payload.dev_id = dev.id;
        const row_created = await create_ifttt_trigger_definition_logic(payload);
        console.log('row_created', row_created);
        return { status: STATUS_OK, message: 'Trigger definition created' }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during trigger definition creation. Please contact support@zen.watch' }
    }
}

export async function fetch_trigger_definition_details(id: number) {
    try {
        const row = await fetch_trigger_definition_details_logic(id);
        return { status: STATUS_OK, message: row }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during trigger definition details fetch. Please contact support@zen.watch' }
    }
}

export async function fetch_unique_ifttt_target_resource_names_for_public_triggers() {
    try {
        const rows = await fetch_unique_ifttt_target_resource_names_for_public_triggers_logic();
        return { status: STATUS_OK, message: rows }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during unique target names for public triggers fetch. Please contact support@zen.watch' }
    }
}

export async function fetch_ifttt_public_trigger_definitions(target_resource_name: string) {
    try {
        const rows = await fetch_ifttt_public_trigger_definitions_logic(target_resource_name);
        return { status: STATUS_OK, message: rows }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during trigger definitions fetch. Please contact support@zen.watch' }
    }
}