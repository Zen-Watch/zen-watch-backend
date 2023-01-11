import { Network, Alchemy } from 'alchemy-sdk';
import dotenv from 'dotenv';
dotenv.config();

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);

export async function getLatestBlock() {
  const block = await alchemy.core.getBlockNumber();
  return block;
}
