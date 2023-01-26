import { BILLION, USD } from "../utils/constants";
import { getBlockByHash, getTransactionByHash, getTransactionReceiptByHash } from "../handlers/alchemy.handler";
import { getExchangeRate } from "../handlers/cryptocompare.handler";
import { getChainFromEventName, setAppExchangeCurrency } from "../utils/util_methods";

// Specific to EVM accounting model
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

        const exchange_currency = setAppExchangeCurrency(event.app_exchange_currency)
        const exchange_rate_resp = await getExchangeRate(chain, exchange_currency, block_timestamp);

        console.log('txn-hash', event.event_json.event_properties.txn_hash);

        backfill_json['txn_hash'] = event.event_json.event_properties.txn_hash

        backfill_json['exchange_currency'] = exchange_rate_resp[0]
        backfill_json['exchange_rate'] = exchange_rate_resp[1]

        backfill_json['gasUsed'] = Number(receipt.gasUsed)
        backfill_json['effectiveGasPrice'] = Number(receipt.effectiveGasPrice) / BILLION
        backfill_json['txn_type'] = receipt.type //EIP-1559 or Legacy
        backfill_json['txn_status'] = receipt.status
        backfill_json['confirmations'] = receipt.confirmations
        backfill_json['blockNumber'] = receipt.blockNumber
        backfill_json['blockHash'] = receipt.blockHash
        backfill_json['blockTimestamp'] = block.timestamp

        backfill_json['to_address'] = receipt.to
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

        // ============== All summarized final values are represented as native & exchange currencies (ETH, USD etc.) ======================

        // EIP-1559 refunds unused gas to the source wallet_address, txn_savings tracks gas refunds in Native units, not in Gwei
        if (backfill_json['txn_type'] === 2)
            backfill_json['txn_savings'] = ((backfill_json['maxFeePerGas'] - backfill_json['effectiveGasPrice']) * backfill_json['gasUsed']) / BILLION // In Native Token units - MATIC, ETH, not Gwei
        else
            backfill_json['txn_savings'] = 0

        backfill_json['txn_savings_fiat'] = backfill_json['txn_savings'] * backfill_json['exchange_rate'] // Native to Fiat, ex. MATIC-USD

        // If a txn sends value, and not a smart contract call, which only sends data
        backfill_json['txn_value'] = Number(txn_response.value) / (BILLION * BILLION) // In Native Token units - MATIC, ETH, not Wei
        backfill_json['txn_value_fiat'] = backfill_json['value'] * backfill_json['exchange_rate'] // Native to Fiat, ex. MATIC-USD

        // Final used gas cost at the time of transaction
        backfill_json['final_txn_fee'] = (backfill_json['gasUsed'] * backfill_json['effectiveGasPrice']) / BILLION // In Native Token units - MATIC, ETH, not Gwei
        backfill_json['final_txn_fee_fiat'] = backfill_json['final_txn_fee'] * backfill_json['exchange_rate'] // Native to Fiat, ex. MATIC-USD

        backfill_json['gas_savings'] = backfill_json['gasLimit'] - backfill_json['gasUsed']
        backfill_json['used_gas_ratio'] = backfill_json['gasUsed'] / backfill_json['gasLimit']

        // =================== Above is what you see with Etherscan, Below is app-specific inference exclusive to Zen.Watch ===========================

        // Allows additional tag which is indexed to pass any worthy metadata about the txn in the event_properties (Ex. quote_Id, or app_txn_type / metadata)
        if (event.app_txn_tag)
            backfill_json['app_txn_tag'] = event.app_txn_tag

        // All these are represented in Native & Exchange currency and not in Gwei (ETH, MATIC, USD)
        // Assumption here is Dapps can have 2 model of charging users: charge incl txn_cost and a mark up or a separate flat fee
        // The model is flexible to have both types of fee per txn, althought expectation is the majority with would a single charge incl txn cost & markup 
        // Final Profit/Loss is summed up with both types of charges per transaction (as available), which can later be aggregated
        // With this we can calculate if the app is profitable, what's the month-over-month or week-over-week profitability & you can calculate your burn rate
        // This can help Dapps project financials at scale to help with the business reporting & for fund raising
        backfill_json['app_total_profit_loss'] = 0.0
        backfill_json['app_total_profit_loss_fiat'] = 0.0
        
        // Only if marked-up app_charge_incl_txn_cost is set, refer to the profit/loss due to app markup over the actual txn cost
        if (event.app_charge_incl_txn_cost) {
            backfill_json['app_charge_incl_txn_cost'] = event.app_charge_incl_txn_cost
            if (event.app_charge_incl_txn_cost_fiat)
                backfill_json['app_charge_incl_txn_cost_fiat'] = event.app_charge_incl_txn_cost_fiat // Use fiat value if sent, else infer with exchange_rate at the time of transaction
            else
                backfill_json['app_charge_incl_txn_cost_fiat'] =   backfill_json['app_charge_incl_txn_cost'] *  backfill_json['exchange_rate'] // best approximation
            
            // app Transaction level P/L
            backfill_json['app_profit_loss_from_charge_incl_txn_cost'] = backfill_json['app_charge_incl_txn_cost'] - backfill_json['final_txn_fee']
            backfill_json['app_profit_loss_from_charge_incl_txn_cost_fiat'] = backfill_json['app_charge_incl_txn_cost_fiat'] - backfill_json['final_txn_fee_fiat']

            // Add to total profit loss per txn
            backfill_json['app_total_profit_loss'] += backfill_json['app_profit_loss_from_charge_incl_txn_cost']
            backfill_json['app_total_profit_loss_fiat'] += backfill_json['app_profit_loss_from_charge_incl_txn_cost_fiat']
        }

        // If app charges a fee excluding txn cost, then its passed through for aggregation, without txn level profit-loss calculation
        // This can later be summed up with the above profit/loss or scaled up with the number of transactions
        if (event.app_charge_excl_txn_cost) {
            backfill_json['app_charge_excl_txn_cost'] = event.app_charge_excl_txn_cost
            if (event.app_charge_excl_txn_cost_fiat)
                backfill_json['app_charge_excl_txn_cost_fiat'] = event.app_charge_excl_txn_cost_fiat
            else
                backfill_json['app_charge_excl_txn_cost_fiat'] = backfill_json['app_charge_excl_txn_cost'] * backfill_json['exchange_rate'] // best approximation
            
            // Add to total profit loss per txn
            backfill_json['app_total_profit_loss'] += backfill_json['app_charge_excl_txn_cost']
            backfill_json['app_total_profit_loss_fiat'] += backfill_json['app_charge_excl_txn_cost_fiat']
        }

        // TODO: Decode transaction data, try to get data from etherscan/dappradar/coingecko/coinmarketcap
        backfill_json['data'] = txn_response.data
        backfill_json['is_sc_call'] = false
        if (backfill_json['data'] !== undefined && backfill_json['data'] !== null && backfill_json['data'] !== "0x0" && backfill_json['data'].length > 3)
            backfill_json['is_sc_call'] = true

    }
    return backfill_json
}