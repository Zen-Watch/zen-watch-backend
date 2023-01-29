import { connect_to_mysql } from "../db/connection_pool";
import { UNPROCESSED_ENTITY } from "../utils/constants";
import { get_developer_by_api_key_from_cache } from "../cache/developer.cache";

export async function saveEVMTransactionEvent(api_key:string, event:any) {
    try{
        const dev = await get_developer_by_api_key_from_cache(api_key);
        const pool = await connect_to_mysql();
        const backfill_json = {}
        const result:any = await pool!.query(
            `insert into event_evm_transaction (id, event_type, dev_id, event_status, event_json, backfill_json) values (?,?,?,?,?,?)`, 
            [event.event_id, event.event_type, dev.id, UNPROCESSED_ENTITY, JSON.stringify(event), JSON.stringify(backfill_json)]
        );
    }catch(e){
        throw e;
    }
}