import {
  ETHEREUM_MAINNET,
  ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE,
  POLYGON_MAINNET,
  POLYGON_MAINNET_TRANSACTION_EVENT_TYPE,
  UNSUPPORTED_EVENT_TYPE,
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
