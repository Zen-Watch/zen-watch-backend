import { Network, Alchemy } from 'alchemy-sdk';
import dotenv from 'dotenv';
import { POLYGON_MAINNET } from '../utils/constants';
dotenv.config();


const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};

// Instantiate different alchemy clients for different chains
const alchemy_polygon_mainnet = new Alchemy(settings);


function getPolygonClientForChain(chain: string) {
  switch(chain) {
    case POLYGON_MAINNET:
      return alchemy_polygon_mainnet;
    default:
      return alchemy_polygon_mainnet;
  }
}

export async function getLatestBlock() {
  const block = await alchemy_polygon_mainnet.core.getBlockNumber();
  return block;
}

export async function getTransactionReceiptByHash(chain: string, txn_hash: string) {
  const alchemy = getPolygonClientForChain(chain);
  const receipt = await alchemy.core.getTransactionReceipt(txn_hash);
  return receipt;
}

export async function getTransactionByHash(chain: string, txn_hash: string) {
  const alchemy = getPolygonClientForChain(chain);
  const receipt = await alchemy.core.getTransaction(txn_hash);
  return receipt;
}

export async function getBlockByHash(chain: string, block_hash: string) {
  const alchemy = getPolygonClientForChain(chain);
  const receipt = await alchemy.core.getBlock(block_hash);
  return receipt;
}
