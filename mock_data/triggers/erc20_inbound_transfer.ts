// dependency
// const { ethers } = require("ethers");
// const alchemyApiKey = "your_alchemy_api_key";


`
async function watchERCTokenDeposit(targetAddress, contractAddress, ethers, provider, zenwatch) {
    const contract = new ethers.Contract(contractAddress, [
        'event Transfer(address indexed from, address indexed to, uint256 value)',
    ], provider);

    const listener = (from, to, amount, event) => {
        if (to.toUpperCase() === targetAddress.toUpperCase()) {
            let info = {
                from: from,
                to: to,
                value: ethers.utils.formatUnits(amount, 6)
                data: event
            }
            zenwatch.handleTrigger(info);
        }
    };

    contract.on('Transfer', listener);
    return contract;
}`


function erc20_inbound_transfer(alchemy_web3: any, incomingContract: string, incomingAddress: string, zen_watch: any) {
    const abi = [
        { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'from', 'type': 'address' }, { 'indexed': true, 'name': 'to', 'type': 'address' }, { 'indexed': false, 'name': 'value', 'type': 'uint256' }], 'name': 'Transfer', 'type': 'event' }
    ];
    const contract = new alchemy_web3.eth.Contract(abi, incomingContract);

    const eventEmitter = contract.events.Transfer({ filter: { to: incomingAddress } })
        .on('data', (event) => {
            console.log('Deposit detected:', event.returnValues);
            const payload = {
                event: 'successful_deposit',
                data: event.returnValues
            };
            zen_watch.handleTriggerSuccess(payload);
        })
        .on('error', err => zen_watch.handleTriggerFailure(err));
    
    return eventEmitter;
}

// {
//     event: "successful_deposit",   
//     data: {
//         blockNum: '0xbb933a',
//         hash: '0xcfb197f62ec5c7f0e71a11ec0c4a0e394a3aa41db5386e85526f86c84b3f2796',
//         from: '0x0000000000000000000000000000000000000000',
//         to: '0xaba7161a7fb69c88e16ed9f455ce62b791ee4d03',
//         value: null,
//         erc721TokenId: '0x0000000000000000000000000000000000000000000000000000000000000000',
//         erc1155Metadata: null,
//         tokenId: '0x0000000000000000000000000000000000000000000000000000000000000000',
//         asset: 'BAYC',
//         category: 'erc721',
//         rawContract: {
//           value: null,
//           address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
//           decimal: null
//         }
//       }
// }

// {
//     from: "0x1a80dcd5b44988ebaa8ca000ab565e0556714a33",
//     to: "0x5f69c2ec01c22843f8273838d570243fd1963014",
//     value: 3000000000000000,
// }




/**
 * 
 * console.log('DEBUG PRINTING', trigger_info, _instance);
 * 
 * DEBUG PRINTING {
  id: 5,
  dev_id: 1,
  categ_id: 3,
  is_public: 1,
  is_trusted_source: 1,
  is_compute_intensive: 0,
  is_push_mechanism: 1,
  target_resource_name: 'polygon_mainnet',
  trigger_name: 'ERC incoming token transfers',
  trigger_description: 'Triggers when there is an incoming ERC token transfer event to a target address.',
  trigger_signature: 'async function watchERCTokenDeposit(targetAddress, contractAddress, ethers, provider, zenwatch)',
  trigger_code: 'async function watchERCTokenDeposit(targetAddress, contractAddress, ethers, provider, zenwatch) {\r\n' +
    '    const contract = new ethers.Contract(contractAddress, [\r\n' +
    "        'event Transfer(address indexed from, address indexed to, uint256 value)',\r\n" +
    '    ], provider);\r\n' +
    '\r\n' +
    '    const listener = (from, to, amount, event) => {\r\n' +
    '        if (to.toUpperCase() === targetAddress.toUpperCase()) {\r\n' +
    '            const eventData = event.args;\r\n' +
    '            zenwatch.handleTrigger(eventData);\r\n' +
    '        }\r\n' +
    '    };\r\n' +
    '\r\n' +
    "    contract.on('Transfer', listener);\r\n" +
    '    return contract;\r\n' +
    '}',
  trigger_expected_output: '{\r\n' +
    '    from: "0x1a80dcd5b44988ebaa8ca000ab565e0556714a33",\r\n' +
    '    to: "0x5f69c2ec01c22843f8273838d570243fd1963014",\r\n' +
    '    value: 3000000000000000,\r\n' +
    '}',
  trigger_expected_output_description: 'Event response format for successful deposit',
  created_ts: 2023-02-23T20:02:33.000Z,
  updated_ts: 2023-02-23T20:02:33.000Z
} {
  id: 11,
  ifttt_instance_worker_shard_id: 0,
  dev_id: 1,
  is_trigger_trusted_source: 1,
  is_trigger_compute_intensive: 0,
  is_trigger_push_mechanism: 1,
  trigger_target_resource_name: 'polygon_mainnet',
  ifttt_instance_name: 'erc20_inbound_transfer_post_webhook_feb_21_2023',
  ifttt_instance_description: 'If there is an erc20 deposit, call my pre-configured webhooks',
  ifttt_instance_is_on: 1,
  trigger_info: {
    params: {
      targetAddress: '0xeE52f6E8F8F075Bb6119958c1ACeB16C788e57d6',
      contractAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
    },
    trigger_id: 5
  },
  actions_info: [ { params: [Object], action_id: 5 } ],
  created_ts: 2023-02-23T20:03:51.000Z,
  updated_ts: 2023-02-23T23:33:06.000Z
}
Created contract -  Promise {
  Contract {
    interface: Interface {
      fragments: [Array],
      _abiCoder: [AbiCoder],
      functions: {},
      errors: {},
      events: [Object],
      structs: {},
      deploy: [ConstructorFragment],
      _isInterface: true
    },
    provider: AlchemyProvider {
      _isProvider: true,
      _events: [Array],
      _emitted: [Object],
      disableCcipRead: false,
      formatter: [Formatter],
      anyNetwork: false,
      _network: [Object],
      _maxInternalBlockNumber: -1024,
      _lastBlockNumber: -2,
      _maxFilterBlockRange: 10,
      _pollingInterval: 4000,
      _fastQueryDate: 0,
      connection: [Object],
      _nextId: 42,
      apiKey: 'vurnWXm-h9aSA14aLO_CU7gYzeFpiCoy',
      _poller: Timeout {
        _idleTimeout: 4000,
        _idlePrev: [TimersList],
        _idleNext: [Timeout],
        _idleStart: 3527,
        _onTimeout: [Function (anonymous)],
        _timerArgs: undefined,
        _repeat: 4000,
        _destroyed: false,
        [Symbol(refed)]: true,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 47,
        [Symbol(triggerId)]: 0
      },
      _bootstrapPoll: Timeout {
        _idleTimeout: 1,
        _idlePrev: [TimersList],
        _idleNext: [Timeout],
        _idleStart: 3527,
        _onTimeout: [Function (anonymous)],
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: false,
        [Symbol(refed)]: true,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 48,
        [Symbol(triggerId)]: 0
      }
    },
    signer: null,
    callStatic: {},
    estimateGas: {},
    functions: {},
    populateTransaction: {},
    filters: {
      'Transfer(address,address,uint256)': [Function (anonymous)],
      Transfer: [Function (anonymous)]
    },
    _runningEvents: {
      '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063@0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef': [FragmentRunningEvent]
    },
    _wrappedEmits: {
      '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063@0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef': [Function: wrappedEmit]
    },
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    resolvedAddress: Promise { <pending> }
  }
}
 */