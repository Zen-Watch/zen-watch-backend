import { create_ifttt_instance_logic, get_ifttt_instances_by_dev_id, update_ifttt_instance_status_logic } from "../logic/ifttt_instance.logic";
import { INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND, STATUS_OK } from "../utils/constants";
import dotenv from 'dotenv';
import { get_random_shard_number } from "../utils/util.methods";
import { get_developer_by_email_from_cache } from "../cache/developer.cache";
dotenv.config();

export async function create_ifttt_instance(payload: any) {
    try {
        const dev = await get_developer_by_email_from_cache(payload.email);
        const shard_id = get_random_shard_number(Number(process.env.IFTTT_INSTANCE_WORKER_SHARDS));
        payload.ifttt_instance_worker_shard_id = shard_id;
        payload.dev_id = dev.id;
        const row_created = await create_ifttt_instance_logic(payload);
        console.log('row_created', row_created);
        return { status: STATUS_OK, message: 'IFTTT instance created' }
    } catch(error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during ifttt instance creation. Please contact support@zen.watch', error }
    }
}

export async function update_ifttt_instance_status(email: string, instance_id: number, new_instance_status: number) {
    try {
        const dev = await get_developer_by_email_from_cache(email);
        const row_updated = await update_ifttt_instance_status_logic(dev.id, instance_id, new_instance_status);
        console.log('row_updated', row_updated);
        return { status: STATUS_OK, message: 'IFTTT instance status updated' }
    } catch(error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during ifttt instance status update. Please contact support@zen.watch', error }
    }
}

export async function fetch_ifttt_instances(email: string) {
    try {
        const dev = await get_developer_by_email_from_cache(email);
        const result = await get_ifttt_instances_by_dev_id(dev.id);
        return { status: STATUS_OK, message: result };
    } catch (e: any) {
        return { status: INTERNAL_SERVER_ERROR, message: e.message };
    }
}
    