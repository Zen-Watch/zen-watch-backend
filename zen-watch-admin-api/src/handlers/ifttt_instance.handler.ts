import { create_ifttt_instance_logic } from "../logic/ifttt_instance.logic";
import { STATUS_NOT_FOUND, STATUS_OK } from "../utils/constants";
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
    