import { connect_to_mysql } from "../db/connection_pool";
import { PROCESSED_ENTITY, SUPPORTED_EVM_TRANSACTION_EVENTS, UNPROCESSED_ENTITY } from "../utils/constants";

export async function fetchUnprocessedEVMTransactionEvents() {
    const pool = await connect_to_mysql()
    const result: any = await pool!.query(`select * from event_evm_transaction where event_status=? and event_type in (?)`, [UNPROCESSED_ENTITY, SUPPORTED_EVM_TRANSACTION_EVENTS]);
    return result[0];
}

export async function saveBackFillJson(event:any, backfill_json_str:string) {
    // Using simple update, the access pattern can allow for simple update although the code is not race-condition free
    // Later change to select for update - do things that don't scale
    // Reference: https://sehannrathnayake.medium.com/how-to-handle-mysql-database-transactions-with-nodejs-b7a2bf1fd203
    try{
        const pool = await connect_to_mysql();
        const result:any = await pool!.query(`UPDATE event_evm_transaction SET backfill_json= ?, event_status= ? where id = ?`, [backfill_json_str, PROCESSED_ENTITY, event.id]);
    }catch(e){
        console.log('Error upating backfill json in saveBackFillJson', e)
        throw e;
    }
}