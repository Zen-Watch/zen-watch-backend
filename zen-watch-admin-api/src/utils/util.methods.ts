import {
  ETHEREUM_MAINNET,
  ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE,
  INR,
  POLYGON_MAINNET,
  POLYGON_MAINNET_TRANSACTION_EVENT_TYPE,
  SUPPORTED_EVM_TRANSACTION_EVENTS,
  UNSUPPORTED_EVENT_TYPE,
  USD,
} from "./constants";

export function get_evm_chain_event_name(chain: string) {
  if (chain === POLYGON_MAINNET) 
    return POLYGON_MAINNET_TRANSACTION_EVENT_TYPE;
  else if (chain === ETHEREUM_MAINNET)
    return ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE;
  else  
    return UNSUPPORTED_EVENT_TYPE;
}

export function get_evm_chain_event_names(chains: string[]) {
  const res = [];
  for (let chain of chains)
    res.push(get_evm_chain_event_name(chain));
  return res;
}

export function getAppExchangeCurrency(app_exchange_currency: string) {
  if (app_exchange_currency === undefined || app_exchange_currency === null)
      return USD;
  switch (app_exchange_currency.toUpperCase()) {
      case USD:
          return USD;
      case INR:
          return INR;
      default:
          return USD;
  }
}

export function isOnchainTransactionEventType(event_type: any) {
  return SUPPORTED_EVM_TRANSACTION_EVENTS.includes(event_type)
}
