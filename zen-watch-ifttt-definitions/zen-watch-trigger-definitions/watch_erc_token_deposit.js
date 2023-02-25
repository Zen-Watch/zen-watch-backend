// Trigger type: Onchain - Ethereum callback
// String version with zenwatch handler
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
                value: ethers.utils.formatUnits(amount, 6),
                data: event
            }
            zenwatch.handleTrigger(info);
        }
    };

    contract.on('Transfer', listener);
    return contract;
}`

`async function watch_erc_token_deposit(targetAddress, contractAddress, ethers, provider, zenwatch) {
    const contract = new ethers.Contract(contractAddress, [
        'event Transfer(address indexed from, address indexed to, uint256 value)',
    ], provider);

    const listener = (from, to, amount, event) => {
        if (to.toUpperCase() === targetAddress.toUpperCase()) {
            let info = {
                from: from,
                to: to,
                value: ethers.utils.formatUnits(amount, 6),
                data: event
            }
            zenwatch.handle(info);
        }
    };

    contract.on('Transfer', listener);
    return contract;
}`


// Actual function definition that's tested in Replit or IDE
// Replace return or log statements with zenwatch handler & add the zenwatch handler as a parameter
// Add other required dependencies as parameters as needed (ethers, provider, etc.)
async function watch_erc_token_deposit(targetAddress, contractAddress, ethers, provider) {
    const contract = new ethers.Contract(contractAddress, [
        'event Transfer(address indexed from, address indexed to, uint256 value)',
    ], provider);

    const listener = (from, to, amount, event) => {
        if (to.toUpperCase() === targetAddress.toUpperCase()) {
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