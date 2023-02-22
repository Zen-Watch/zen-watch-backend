// dependency
// const { ethers } = require("ethers");
// const alchemyApiKey = "your_alchemy_api_key";


// https://www.freeformatter.com/json-escape.html#before-output


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