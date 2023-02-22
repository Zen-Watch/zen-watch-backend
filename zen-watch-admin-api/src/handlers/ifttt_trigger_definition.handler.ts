import { create_ifttt_trigger_definition_logic } from "../logic/ifttt_trigger_definition.logic";
import { STATUS_NOT_FOUND, STATUS_OK } from "../utils/constants";
import dotenv from 'dotenv';
import { getRandomShardNumber } from "../utils/util.methods";
import { get_developer_by_email_from_cache } from "../cache/developer.cache";
dotenv.config();

export async function create_ifttt_trigger_definition(payload: any) {
    try {
        const dev = await get_developer_by_email_from_cache(payload.email);
        const shard_id = getRandomShardNumber(Number(process.env.TRIGGER_WORKER_SHARDS));
        payload.trigger_worker_shard_id = shard_id;
        payload.dev_id = dev.id;
        const row_created = await create_ifttt_trigger_definition_logic(payload);
        console.log('row_created', row_created);
        return { status: STATUS_OK, message: 'Trigger definition created' }
    } catch(error) {
        return { status: STATUS_NOT_FOUND, message: 'Error during trigger definition creation. Please contact support@zen.watch' }
    }
}
    