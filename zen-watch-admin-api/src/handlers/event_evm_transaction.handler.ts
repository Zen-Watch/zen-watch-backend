
import {
  get_evm_transaction_details,
  get_gas_cost_metrics_for_processed_evm_transactions,
} from "../logic/event_evm_transaction.logic";
import { get_developer_by_email_from_cache } from "../cache/developer.cache";
import { INTERNAL_SERVER_ERROR, STATUS_OK, TXN_STATUS_ERROR, TXN_STATUS_SUCCESS } from "../utils/constants";
import { getAppExchangeCurrency, get_evm_chain_event_names } from "../utils/util.methods";

export async function fetch_event_evm_transaction_gas_cost_insights(email: string, chains: string[], lookback_period: number, exchange_currency: string) {
  try {
    const dev = await get_developer_by_email_from_cache(email);
    const chain_events = get_evm_chain_event_names(chains);
    const app_exchange_currency = getAppExchangeCurrency(exchange_currency)
    const successful_txn_metrics = await get_gas_cost_metrics_for_processed_evm_transactions(dev.id, TXN_STATUS_SUCCESS, chain_events, lookback_period, app_exchange_currency);
    const error_txn_metrics = await get_gas_cost_metrics_for_processed_evm_transactions(dev.id, TXN_STATUS_ERROR, chain_events, lookback_period, app_exchange_currency);
    const result = {
      exchange_currency:app_exchange_currency,
      successful_txn_metrics,
      error_txn_metrics,
    };
    return { status: STATUS_OK, message: result };
  } catch (e: any) {
    return { status: INTERNAL_SERVER_ERROR, message: e.message };
  }
}

export async function fetch_event_evm_transaction_details(email: string, txn_hashes: string[]) {
  try {
    const dev = await get_developer_by_email_from_cache(email);
    const result = await get_evm_transaction_details(dev.id, txn_hashes);
    return { status: STATUS_OK, message: result };
  } catch (e: any) {
    return { status: INTERNAL_SERVER_ERROR, message: e.message };
  }
}
