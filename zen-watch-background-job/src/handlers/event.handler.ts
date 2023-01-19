import { appendFileSync } from "fs";
import { fetchUnprocessedEvents } from "../logic/web2/event.logic";
import { BILLION, POLYGON_MAINNET, POLYGON_MAINNET_TRANSACTION_EVENT_TYPE, USD } from "../utils/constants";
import { getBlockByHash, getTransactionByHash, getTransactionReceiptByHash } from "./alchemy.handler";
import { getExchangeRate } from "./cryptocompare.handler";
import { construct_evm_backfill_json } from "../core/evm_transaction_backfill.core";

export async function handleFetchUnprocessedEvents() {
    return await fetchUnprocessedEvents();
}

//populate the visualization & notification tables as required
export async function handleProcessUnprocessedEvents(events: any) {
    try {
        for (let _event of events) {
            await processEvent(_event);
        }
    } catch (e) {
        throw e;
    }
}

// Can be called internally or externally adhoc
export async function processEvent(event: any) {
    if (event.event_type === POLYGON_MAINNET_TRANSACTION_EVENT_TYPE) {
        // const chain = getChainFromEventName(event.event_type);
        // // fetch transaction receipt from alchemy
        // const receipt = await getTransactionReceiptByHash(chain, event.event_json.event_properties.txn_hash)
        // const txn_response = await getTransactionByHash(chain, event.event_json.event_properties.txn_hash)

        // // if nil or pending, skip - try in next round (this would be optimized further)
        // if (receipt === null || txn_response === null) {
        //     // If transaction has been stuck for > 1min, notify developer
        //     //TODO - Implement later
        //     console.log('RECEIPT NULL - ', event.event_json.event_properties.txn_hash);
        // }
        // else {
        //     // Get rest of the transaction details
        //     console.log('PROCESSING TXN - ', event.event_json.event_properties.txn_hash);
        //     // Get the block timestamp
        //     const block = await getBlockByHash(chain, receipt.blockHash)

        //     // Get the USD exchange rate at the time of block creation     
        //     const block_timestamp = block.timestamp
        //     const exchange_rate_resp = await getExchangeRate(chain, USD, block_timestamp);

        //     // backfill transaction data
        //     const backfill_json: any = {}

        //     backfill_json['txn_hash'] = event.event_json.event_properties.txn_hash

        //     backfill_json['exchange_currency'] = exchange_rate_resp[0]
        //     backfill_json['exchange_rate'] = exchange_rate_resp[1]

        //     backfill_json['gasUsed'] = Number(receipt.gasUsed)
        //     backfill_json['effectiveGasPrice'] = Number(receipt.effectiveGasPrice)/BILLION
        //     backfill_json['type'] = receipt.type
        //     backfill_json['status'] = receipt.status
        //     backfill_json['confirmations'] = receipt.confirmations
        //     backfill_json['blockNumber'] = receipt.blockNumber
        //     backfill_json['blockHash'] = receipt.blockHash
        //     backfill_json['blockTimestamp'] = block.timestamp

        //     backfill_json['to'] = receipt.to
        //     backfill_json['contractAddress'] = receipt.contractAddress

        //     backfill_json['gasLimit'] = Number(txn_response.gasLimit)

        //     if (block.baseFeePerGas)
        //         backfill_json['base_fee'] = Number(block.baseFeePerGas)/BILLION
        //     else
        //         backfill_json['base_fee'] = -1

        //     if (txn_response.gasPrice)
        //         backfill_json['gasPrice'] = Number(txn_response.gasPrice)/BILLION
        //     else
        //         backfill_json['gasPrice'] = -1

        //     if (txn_response.maxPriorityFeePerGas)
        //         backfill_json['maxPriorityFeePerGas'] = Number(txn_response.maxPriorityFeePerGas)/BILLION
        //     else
        //         backfill_json['maxPriorityFeePerGas'] = -1

        //     if (txn_response.maxFeePerGas)
        //         backfill_json['maxFeePerGas'] = Number(txn_response.maxFeePerGas)/BILLION
        //     else
        //         backfill_json['maxFeePerGas'] = -1
            
        //     if (backfill_json['gasPrice'] === -1) 
        //         backfill_json['gasPrice'] = Math.min(backfill_json['maxFeePerGas'], backfill_json['base_fee']+backfill_json['maxPriorityFeePerGas'])

        //     if (backfill_json['type'] === 2)    
        //         backfill_json['txn_savings'] = ((backfill_json['maxFeePerGas'] - backfill_json['effectiveGasPrice']) * backfill_json['gasUsed']) / BILLION // In Native Token units - MATIC, ETH, not Gwei
        //     else
        //         backfill_json['txn_savings'] = 0
            
        //     backfill_json['txn_savings_fiat'] = backfill_json['txn_savings'] * backfill_json['exchange_rate'] // Native to Fiat, ex. MATIC-USD

        //     backfill_json['value'] = Number(txn_response.value) / (BILLION*BILLION) // In Native Token units - MATIC, ETH, not Wei
        //     backfill_json['value_fiat'] = backfill_json['value'] * backfill_json['exchange_rate'] // Native to Fiat, ex. MATIC-USD

        //     backfill_json['final_txn_fee'] = (backfill_json['gasUsed'] * backfill_json['effectiveGasPrice']) / BILLION // In Native Token units - MATIC, ETH, not Gwei
        //     backfill_json['final_txn_fee_fiat'] = backfill_json['final_txn_fee'] * backfill_json['exchange_rate'] // Native to Fiat, ex. MATIC-USD

        //     backfill_json['gas_savings'] = backfill_json['gasLimit'] - backfill_json['gasUsed']
        //     backfill_json['used_gas_ratio'] = backfill_json['gasUsed'] / backfill_json['gasLimit']

        //     // TODO: Decode transaction data, try to get data from etherscan/dappradar/coingecko/coinmarketcap
        //     backfill_json['data'] = txn_response.data

            const backfill_json = await construct_evm_backfill_json(event);

            // Inference
            appendFileSync("backfill2.json", JSON.stringify(backfill_json));

        //}
        // potentially extract additional virtual column indexes out of json in mysql (4096 columns possible)
        // Add PM2 to manage the process
    }
}