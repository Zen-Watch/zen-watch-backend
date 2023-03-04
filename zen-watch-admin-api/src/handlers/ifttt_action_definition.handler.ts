import { create_ifttt_action_definition_logic, fetch_action_definition_details_logic, fetch_ifttt_public_approved_action_definitions_logic, fetch_submitted_ifttt_action_definitions_logic, fetch_unique_ifttt_target_resource_names_for_public_actions_logic, update_ifttt_action_definition_approval_status_logic, update_ifttt_action_definition_code_info_logic } from "../logic/ifttt_action_definition.logic";
import { STATUS_NOT_FOUND, STATUS_OK } from "../utils/constants";
import dotenv from 'dotenv';
import { get_developer_by_email_from_cache } from "../cache/developer.cache";
dotenv.config();

export async function create_ifttt_action_definition(payload: any) {
    try {
        const dev = await get_developer_by_email_from_cache(payload.email);
        payload.dev_id = dev.id;
        const row_created = await create_ifttt_action_definition_logic(payload);
        console.log('row_created', row_created);
        return { status: STATUS_OK, message: 'Action definition created' }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during action definition creation. Please contact support@zen.watch' }
    }
}

export async function fetch_action_definition_details(ids: number[]) {
    try {
        const row = await fetch_action_definition_details_logic(ids);
        return { status: STATUS_OK, message: row }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during action definition details fetch. Please contact support@zen.watch' }
    }
}

export async function fetch_unique_ifttt_target_resource_names_for_public_actions() {
    try {
        const rows = await fetch_unique_ifttt_target_resource_names_for_public_actions_logic();
        return { status: STATUS_OK, message: rows }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during unique target resource names fo public actions fetch. Please contact support@zen.watch' }
    }
}

export async function fetch_ifttt_public_approved_action_definitions(target_resource_name: string) {
    try {
        const rows = await fetch_ifttt_public_approved_action_definitions_logic(target_resource_name);
        return { status: STATUS_OK, message: rows }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during public action definitions fetch. Please contact support@zen.watch' }
    }
}

export async function fetch_submitted_ifttt_action_definitions(email: string) {
    try {
        const dev = await get_developer_by_email_from_cache(email);
        const rows = await fetch_submitted_ifttt_action_definitions_logic(dev.id);
        return { status: STATUS_OK, message: rows }
    } catch (error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during action definitions fetch. Please contact support@zen.watch' }
    }
}

export async function update_ifttt_action_definition_approval_status(id: number, is_approved: boolean) {
    try {
        const row_updated = await update_ifttt_action_definition_approval_status_logic(id, is_approved);
        console.log('row_updated', row_updated);
        return { status: STATUS_OK, message: 'IFTTT action definition approval status updated' }
    } catch(error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during action definition approval status update. Please contact support@zen.watch', error }
    }
}

export async function update_ifttt_action_definition_code_info(
    id: number,
    action_signature: string, 
    action_signature_description: string,
    action_code_description: string,
    action_expected_input: string,
    action_expected_input_description: string,
    action_expected_output: string,
    action_expected_output_description: string
) {
    try {
        const row_updated = await update_ifttt_action_definition_code_info_logic(
            id,
            action_signature, 
            action_signature_description,
            action_code_description,
            action_expected_input,
            action_expected_input_description,
            action_expected_output,
            action_expected_output_description
        );
        console.log('row_updated', row_updated);
        return { status: STATUS_OK, message: 'IFTTT action definition code info updated' }
    } catch(error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during action definition code info update. Please contact support@zen.watch', error }
    }
}



