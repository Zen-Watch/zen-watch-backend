import { get_developer_by_email } from "../logic/developer.logic";
import {
  get_evm_transaction_details,
  get_metrics_for_evm_transactions,
} from "../logic/event_evm_transaction.logic";
import { STATUS_OK } from "../utils/constants";

export async function fetch_event_evm_transaction_insights(email: string, lookback_period: number) {
  const dev = await get_developer_by_email(email);
  const successful_txn_metrics = await get_metrics_for_evm_transactions(dev.id, 1, lookback_period);
  const error_txn_metrics = await get_metrics_for_evm_transactions(dev.id, 0, lookback_period);
  const result = {
    successful_txn_metrics,
    error_txn_metrics,
  };
  return { status: STATUS_OK, message: JSON.stringify(result) };
}

export async function fetch_event_evm_transaction_details(txn_hashes: string[]) {
  const result = await get_evm_transaction_details(txn_hashes);
  return { status: STATUS_OK, message: JSON.stringify(result) };
}
