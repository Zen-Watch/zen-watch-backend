// Supported events
export const POLYGON_MAINNET_TRANSACTION_EVENT_TYPE = 'polygon_mainnet_transaction';
export const ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE = 'ethereum_mainnet_transaction';

// Supported Evm Transaction events
export const SUPPORTED_EVM_TRANSACTION_EVENTS = [
    ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE,
    POLYGON_MAINNET_TRANSACTION_EVENT_TYPE,
];

// Supported states
export const UNPROCESSED_ENTITY = 0;
export const PROCESSED_ENTITY = 1;

// Supported networks
export const POLYGON_MAINNET = "polygon_mainnet";
export const ETHEREUM_MAINNET = "ethereum_mainnet";

// Supported currencies
export const MATIC = "MATIC";
export const ETH = "ETH";


// Supported exchange currencies
export const USD = "USD";
export const INR = "INR";

// Numeric units
export const BILLION = 1000000000;