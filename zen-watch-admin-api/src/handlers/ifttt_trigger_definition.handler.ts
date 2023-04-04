import { create_ifttt_trigger_definition_logic, fetch_ifttt_public_approved_trigger_definition_code_logic, fetch_ifttt_public_approved_trigger_definitions_logic, fetch_submitted_ifttt_trigger_definitions_logic, fetch_trigger_definition_details_logic, fetch_unique_ifttt_target_resource_names_for_public_triggers_logic, update_ifttt_trigger_definition_approval_status_logic, update_ifttt_trigger_definition_code_info_logic } from "../logic/ifttt_trigger_definition.logic";
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

export async function fetch_ifttt_public_approved_trigger_definitions(target_resource_name: string, email: string) {
    try {
        const dev = await get_developer_by_email_from_cache(email);
        const rows = await fetch_ifttt_public_approved_trigger_definitions_logic(target_resource_name, dev.id);
        return { status: STATUS_OK, message: rows }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during trigger definitions fetch. Please contact support@zen.watch' }
    }
}

export async function fetch_ifttt_public_approved_trigger_definition_code(trigger_id: number, email: string) {
    try {
        const dev = await get_developer_by_email_from_cache(email);
        const rows = await fetch_ifttt_public_approved_trigger_definition_code_logic(trigger_id, dev.id);
        return { status: STATUS_OK, message: rows }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during trigger definition code explanation fetch. Please contact support@zen.watch' }
    }
}

export async function fetch_submitted_ifttt_trigger_definitions(email: string) {
    try {
        const dev = await get_developer_by_email_from_cache(email);
        const rows = await fetch_submitted_ifttt_trigger_definitions_logic(dev.id);
        return { status: STATUS_OK, message: rows }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during trigger definitions fetch. Please contact support@zen.watch' }
    }
}

export async function update_ifttt_trigger_definition_approval_status(id: number, is_approved: boolean) {
    try {
        const row_updated = await update_ifttt_trigger_definition_approval_status_logic(id, is_approved);
        console.log('row_updated', row_updated);
        return { status: STATUS_OK, message: 'IFTTT trigger definition approval status updated' }
    } catch(error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during trigger definition approval status update. Please contact support@zen.watch', error }
    }
}

export async function update_ifttt_trigger_definition_code_info(
    id: number,
    trigger_signature: string, 
    trigger_signature_description: string,
    trigger_code_description: string,
    trigger_expected_input: string,
    trigger_expected_input_description: string,
    trigger_expected_output: string,
    trigger_expected_output_description: string
) {
    try {
        const row_updated = await update_ifttt_trigger_definition_code_info_logic(
            id,
            trigger_signature, 
            trigger_signature_description,
            trigger_code_description,
            trigger_expected_input,
            trigger_expected_input_description,
            trigger_expected_output,
            trigger_expected_output_description
        );
        console.log('row_updated', row_updated);
        return { status: STATUS_OK, message: 'IFTTT trigger definition code info updated' }
    } catch(error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during trigger definition code info update. Please contact support@zen.watch', error }
    }
}

