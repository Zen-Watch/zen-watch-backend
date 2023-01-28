import { get_developer_by_email } from "../logic/developer.logic";
import {
  get_evm_transaction_details,
  get_metrics_for_processed_evm_transactions,
} from "../logic/event_evm_transaction.logic";
import { INTERNAL_SERVER_ERROR, STATUS_OK, TXN_STATUS_ERROR, TXN_STATUS_SUCCESS } from "../utils/constants";
import { get_evm_chain_event_names } from "../utils/util.methods";

export async function fetch_event_evm_transaction_insights(email: string, chains: string[], lookback_period: number) {
  try {
    const dev = await get_developer_by_email(email);
    const chain_events = get_evm_chain_event_names(chains);
    const successful_txn_metrics = await get_metrics_for_processed_evm_transactions(dev.id, TXN_STATUS_SUCCESS, chain_events, lookback_period);
    const error_txn_metrics = await get_metrics_for_processed_evm_transactions(dev.id, TXN_STATUS_ERROR, chain_events, lookback_period);
    const result = {
      successful_txn_metrics,
      error_txn_metrics,
    };
    return { status: STATUS_OK, message: result };
  } catch (e: any) {
    console.log(e)
    return { status: INTERNAL_SERVER_ERROR, message: e.message };
  }
}

export async function fetch_event_evm_transaction_details(email: string, txn_hashes: string[]) {
  try {
    const dev = await get_developer_by_email(email);
    const result = await get_evm_transaction_details(dev.id, txn_hashes);
    return { status: STATUS_OK, message: result };
  } catch (e: any) {
    console.log(e)
    return { status: INTERNAL_SERVER_ERROR, message: e.message };
  }
}
