import { connect_to_mysql } from "../db/connection_pool";

export async function get_gas_cost_metrics_for_processed_evm_transactions(
  dev_id: number,
  txn_status: number,
  chain_events: string[],
  lookback_period: number,
  app_exchange_currency: string
) {
  try {
    const pool = await connect_to_mysql();
    // setting event_status=1 for filtering by processed events
    const result: any = await pool!.query(
      `select event_type, wallet_address, to_address, contractAddress, txn_hash, txn_status, exchange_rate, exchange_currency, block_timestamp, block_timestamp_ts, txn_savings, txn_savings_fiat, txn_value, txn_value_fiat, final_txn_fee, final_txn_fee_fiat, app_txn_tag, app_charge_incl_txn_cost, app_charge_incl_txn_cost_fiat, app_profit_loss_from_charge_incl_txn_cost, app_profit_loss_from_charge_incl_txn_cost_fiat, app_charge_excl_txn_cost, app_charge_excl_txn_cost_fiat, app_total_profit_loss, app_total_profit_loss_fiat, is_smart_contract_call, country, platform, city, created_ts from event_evm_transaction where dev_id=? and event_status=1 and json_length(backfill_json) != 0 and txn_status=? and event_type in (?) and exchange_currency=? and created_ts > date_sub(now(), interval ? day) order by block_timestamp asc;`,
      [dev_id, txn_status, chain_events, app_exchange_currency, lookback_period]
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
    const result: any = await pool!.query(
      `select event_json, backfill_json from event_evm_transaction where dev_id=? and txn_hash in (?);`,
      [dev_id, txn_hashes]
    );
    return result[0];
  } catch (e) {
    throw e;
  }
}
