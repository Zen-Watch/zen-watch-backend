import { connect_to_mysql } from "../db/connection_pool";

export async function get_metrics_for_evm_transactions(
  dev_id: number,
  txn_status: number,
  chains: string[],
  lookback_period: number
) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool.query(
      `select event_type, wallet_address, txn_hash, txn_status, exchange_rate, exchange_currency, txn_savings, txn_savings_fiat, value, value_fiat, final_txn_fee, final_txn_fee_fiat, block_timestamp, created_ts  from event_evm_transaction where dev_id=? and status=1 and txn_status=? and event_type in (?) and created_ts > date_sub(now(), interval ? day) order by block_timestamp asc;`,
      [dev_id, txn_status, chains, lookback_period]
    );
    return result[0];
  } catch (e) {
    throw e;
  }
}

export async function get_evm_transaction_details(
  dev_id: number,
  txn_hashes: string[]
) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool.query(
      `select event_json, backfill_json from event_evm_transaction where dev_id=? and txn_hash in (?);`,
      [dev_id, txn_hashes]
    );
    return result[0];
  } catch (e) {
    throw e;
  }
}
