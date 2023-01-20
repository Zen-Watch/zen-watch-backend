import { BILLION, USD } from "../utils/constants";
import { getBlockByHash, getTransactionByHash, getTransactionReceiptByHash } from "../handlers/alchemy.handler";
import { getExchangeRate } from "../handlers/cryptocompare.handler";
import { getChainFromEventName } from "../utils/util_methods";

export async function construct_evm_backfill_json(event: any) {
    console.log('Processing transaction', event.event_json.event_properties.txn_hash)
    // backfill transaction data
    const backfill_json: any = {}
    const chain = getChainFromEventName(event.event_type);
    // fetch transaction receipt from alchemy
    const receipt = await getTransactionReceiptByHash(chain, event.event_json.event_properties.txn_hash)
    const txn_response = await getTransactionByHash(chain, event.event_json.event_properties.txn_hash)

    // if nil or pending, skip - try in next round (this would be optimized further)
    if (receipt === null || txn_response === null) {
        // If transaction has been stuck for > 1min, notify developer
        //TODO - Implement later
        console.log('Skipping for no-receipt', event.event_json.event_properties.txn_hash)
    }
    else {
        // Get rest of the transaction details
        // Get the block timestamp
        const block = await getBlockByHash(chain, receipt.blockHash)

        // Get the USD exchange rate at the time of block creation     
        const block_timestamp = block.timestamp
        const exchange_rate_resp = await getExchangeRate(chain, USD, block_timestamp);

        backfill_json['txn_hash'] = event.event_json.event_properties.txn_hash

        backfill_json['exchange_currency'] = exchange_rate_resp[0]
        backfill_json['exchange_rate'] = exchange_rate_resp[1]

        backfill_json['gasUsed'] = Number(receipt.gasUsed)
        backfill_json['effectiveGasPrice'] = Number(receipt.effectiveGasPrice) / BILLION
        backfill_json['type'] = receipt.type
        backfill_json['status'] = receipt.status
        backfill_json['confirmations'] = receipt.confirmations
        backfill_json['blockNumber'] = receipt.blockNumber
        backfill_json['blockHash'] = receipt.blockHash
        backfill_json['blockTimestamp'] = block.timestamp

        backfill_json['to'] = receipt.to
        backfill_json['contractAddress'] = receipt.contractAddress

        backfill_json['gasLimit'] = Number(txn_response.gasLimit)

        if (block.baseFeePerGas)
            backfill_json['base_fee'] = Number(block.baseFeePerGas) / BILLION
        else
            backfill_json['base_fee'] = -1

        if (txn_response.gasPrice)
            backfill_json['gasPrice'] = Number(txn_response.gasPrice) / BILLION
        else
            backfill_json['gasPrice'] = -1

        if (txn_response.maxPriorityFeePerGas)
            backfill_json['maxPriorityFeePerGas'] = Number(txn_response.maxPriorityFeePerGas) / BILLION
        else
            backfill_json['maxPriorityFeePerGas'] = -1

        if (txn_response.maxFeePerGas)
            backfill_json['maxFeePerGas'] = Number(txn_response.maxFeePerGas) / BILLION
        else
            backfill_json['maxFeePerGas'] = -1

        if (backfill_json['gasPrice'] === -1)
            backfill_json['gasPrice'] = Math.min(backfill_json['maxFeePerGas'], backfill_json['base_fee'] + backfill_json['maxPriorityFeePerGas'])

        if (backfill_json['type'] === 2)
            backfill_json['txn_savings'] = ((backfill_json['maxFeePerGas'] - backfill_json['effectiveGasPrice']) * backfill_json['gasUsed']) / BILLION // In Native Token units - MATIC, ETH, not Gwei
        else
            backfill_json['txn_savings'] = 0

        backfill_json['txn_savings_fiat'] = backfill_json['txn_savings'] * backfill_json['exchange_rate'] // Native to Fiat, ex. MATIC-USD

        backfill_json['value'] = Number(txn_response.value) / (BILLION * BILLION) // In Native Token units - MATIC, ETH, not Wei
        backfill_json['value_fiat'] = backfill_json['value'] * backfill_json['exchange_rate'] // Native to Fiat, ex. MATIC-USD

        backfill_json['final_txn_fee'] = (backfill_json['gasUsed'] * backfill_json['effectiveGasPrice']) / BILLION // In Native Token units - MATIC, ETH, not Gwei
        backfill_json['final_txn_fee_fiat'] = backfill_json['final_txn_fee'] * backfill_json['exchange_rate'] // Native to Fiat, ex. MATIC-USD

        backfill_json['gas_savings'] = backfill_json['gasLimit'] - backfill_json['gasUsed']
        backfill_json['used_gas_ratio'] = backfill_json['gasUsed'] / backfill_json['gasLimit']

        // TODO: Decode transaction data, try to get data from etherscan/dappradar/coingecko/coinmarketcap
        backfill_json['data'] = txn_response.data

        backfill_json['is_sc_call'] = false
        if (backfill_json['data'] !== undefined && backfill_json['data'] !== null && backfill_json['data'] !== "0x0" && backfill_json['data'].length > 3)
            backfill_json['is_sc_call'] = true

    }
    return backfill_json
}