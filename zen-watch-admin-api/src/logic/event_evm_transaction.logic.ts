import { connect_to_mysql } from "../db/connection_pool";
import { UNPROCESSED_ENTITY } from "../utils/constants";
import { get_developer_by_email } from "./developer.logic";

export async function get_metrics_for_evm_transactions(dev_id:number, status:number, lookback_period: number) {
    try{
        const pool = await connect_to_mysql();
        const result:any = await pool.query(`select * from event_evm_transaction where dev_id=? order by block_timestamp asc`, [dev_id]);
        return result[0];
    }catch(e){
        throw e;
    }
}

export async function get_evm_transaction_details(txn_hashes: string[]) {
    try{
        const pool = await connect_to_mysql();
        const result:any = await pool.query(`select event_json, backfill_json from event_evm_transaction where txn_hash in [?]`, [txn_hashes]);
        return result[0];
    }catch(e){
        throw e;
    }
}