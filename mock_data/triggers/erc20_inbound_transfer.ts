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
            const eventData = event.args;
            zenwatch.handleTrigger(eventData);
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