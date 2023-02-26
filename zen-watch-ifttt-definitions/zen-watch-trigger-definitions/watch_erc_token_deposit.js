// Trigger type: Onchain - Ethereum callback
// String version with zenwatch handler
`async function watch_erc_token_deposit(zenwatch, payload, ethers, provider) {
    try {
        const contract = new ethers.Contract(payload.contract_address, [
            'event Transfer(address indexed from, address indexed to, uint256 value)',
        ], provider);
    
        const listener = (from, to, amount, event) => {
            if (to.toUpperCase() === payload.target_address.toUpperCase()) {
                let info = {
                    from: from,
                    to: to,
                    value: ethers.utils.formatUnits(amount, 6),
                    data: event
                }
                zenwatch.handle_trigger(info);
            }
        };
    
        contract.on('Transfer', listener);
        return contract;
    } catch (err) {
        zenwatch.handle_fatal_error(err);
    }
}`

// Actual function definition that's tested in Replit or IDE
// Replace return or log statements with zenwatch handler & add the zenwatch handler as a parameter
// Add other required dependencies as parameters as needed (ethers, provider, etc.)
async function watch_erc_token_deposit(zenwatch, payload, ethers, provider) {
    const contract = new ethers.Contract(payload.contract_address, [
        'event Transfer(address indexed from, address indexed to, uint256 value)',
    ], provider);

    const listener = (from, to, amount, event) => {
        if (to.toUpperCase() === payload.target_address.toUpperCase()) {
            let info = {
                from: from,
                to: to,
                value: ethers.utils.formatUnits(amount, 6),
                data: event
            }
            console.log(info);
        }
    };

    contract.on('Transfer', listener);
    return contract;
}
function caller_watch_erc_token_deposit() {
    //const result = echo_bot_by_zen_watch()
    //console.log(result);
}

// Call the main function
caller_watch_erc_token_deposit();