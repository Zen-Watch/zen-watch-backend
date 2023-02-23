import { create_ifttt_action_definition_logic } from "../logic/ifttt_action_definition.logic";
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
    } catch(error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during action definition creation. Please contact support@zen.watch' }
    }
}
    