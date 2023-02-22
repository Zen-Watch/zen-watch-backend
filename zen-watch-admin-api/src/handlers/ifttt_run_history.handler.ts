import { create_ifttt_run_history_logic } from "../logic/ifttt_run_history.logic";
import { STATUS_NOT_FOUND, STATUS_OK } from "../utils/constants";
import dotenv from 'dotenv';
import { getRandomShardNumber } from "../utils/util.methods";
import { get_developer_by_email_from_cache } from "../cache/developer.cache";
dotenv.config();

export async function create_ifttt_run_history(payload: any) {
    try {
        const dev = await get_developer_by_email_from_cache(payload.email);
        const shard_id = getRandomShardNumber(Number(process.env.IFTTT_RUN_HISTORY_WORKER_SHARDS));
        payload.ifttt_run_history_worker_shard_id = shard_id;
        payload.dev_id = dev.id;
        const row_created = await create_ifttt_run_history_logic(payload);
        console.log('row_created', row_created);
        return { status: STATUS_OK, message: 'IFTTT run history created' }
    } catch(error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during ifttt run history creation. Please contact support@zen.watch', error }
    }
}
    