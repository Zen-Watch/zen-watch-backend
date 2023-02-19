import { SUPPORTED_EVM_TRANSACTION_EVENTS } from './constants';
import dotenv from 'dotenv';
dotenv.config();

export function isOnchainTransactionEventType(event_type: any) {
    return SUPPORTED_EVM_TRANSACTION_EVENTS.includes(event_type)
}

// write a function that takes a number and returns a random number between 0 and the number
export function _getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
}

// write a function that to get a random shard number
export function getRandomShardNumber() {
    const api_worker_shards = Number(process.env.API_WORKER_SHARDS);
    return _getRandomNumber(api_worker_shards);
}