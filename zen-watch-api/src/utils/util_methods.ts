import { SUPPORTED_EVM_TRANSACTION_EVENTS } from './constants';
import dotenv from 'dotenv';
dotenv.config();

export function is_onchain_transaction_event_type(event_type: any) {
    return SUPPORTED_EVM_TRANSACTION_EVENTS.includes(event_type)
}

// write a function that takes a number and returns a random number between 0 and the number
export function _get_random_number(max: number) {
    return Math.floor(Math.random() * max);
}

// write a function that to get a random shard number
export function get_random_shard_number() {
    const api_worker_shards = Number(process.env.API_WORKER_SHARDS);
    return _get_random_number(api_worker_shards);
}