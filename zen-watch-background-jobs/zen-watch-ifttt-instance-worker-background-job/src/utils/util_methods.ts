import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();


export function get_alchemy_provider(target_resource_name: any) {
    switch (target_resource_name) {
        case 'ethereum_mainnet':
            return new ethers.providers.AlchemyProvider('homestead', process.env.ALCHEMY_API_KEY);
        case 'matic_mainnet':
            return new ethers.providers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY);
        default:
            return new ethers.providers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY);
    }
}

// write a function that takes a number and returns a random number between 0 and the number
export function _get_random_number(max: number) {
    return Math.floor(Math.random() * max);
}

// write a function that to get a random shard number
export function get_random_shard_number(no_of_shards: number) {
    const worker_shards = Number(no_of_shards);
    return _get_random_number(worker_shards);
}




