import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();


export function getAlchemyProvider(target_resource_name: any) {
    switch (target_resource_name) {
        case 'ethereum_mainnet':
            return new ethers.providers.AlchemyProvider('homestead', process.env.ALCHEMY_API_KEY);
        case 'matic_mainnet':
            return new ethers.providers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY);
        default:
            return new ethers.providers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY);
    }
}
