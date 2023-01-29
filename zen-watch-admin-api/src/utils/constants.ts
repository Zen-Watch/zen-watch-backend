// evm transaction events
export const POLYGON_MAINNET_TRANSACTION_EVENT_TYPE = 'polygon_mainnet_transaction';
export const ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE = 'ethereum_mainnet_transaction';

// Supported Evm Transaction events
export const SUPPORTED_EVM_TRANSACTION_EVENTS = [
    ETHEREUM_MAINNET_TRANSACTION_EVENT_TYPE,
    POLYGON_MAINNET_TRANSACTION_EVENT_TYPE,
];

export const UNSUPPORTED_EVENT_TYPE = 'unsupported_event_type';

// chains
export const POLYGON_MAINNET = 'polygon_mainnet';
export const ETHEREUM_MAINNET = 'ethereum_mainnet';

export const UNPROCESSED_ENTITY = 0;
export const PROCESSED_ENTITY = 1;

// blockchain txn_status
export const TXN_STATUS_ERROR = 0;
export const TXN_STATUS_SUCCESS = 1;

// HTTP headers
export const X_API_KEY_HEADER = 'x-api-key';

// HTTP status codes
export const STATUS_OK=200;
export const UNAUTHORIZED_ACCESS=401;
export const STATUS_NOT_FOUND=404;
export const STATUS_UNPROCESSABLE_ENTITY=422;
export const INTERNAL_SERVER_ERROR=500;

// Supported exchange currencies
export const USD = "USD";
export const INR = "INR";

// error message
export const INVALID_API_KEY = 'Invalid API Key';
export const INVALID_DEVELOPER_EMAIL = 'Invalid Developer Email';


