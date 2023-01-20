import { Network, Alchemy } from 'alchemy-sdk';
import dotenv from 'dotenv';
import { ETHEREUM_MAINNET, POLYGON_MAINNET } from '../utils/constants';
dotenv.config();


// Instantiate different alchemy clients for different chains
const polygon_mainnet_alchemy_client = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
});

const ethereum_mainnet_alchemy_client = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});


function getPolygonClientForChain(chain: string) {
  switch(chain) {
    case POLYGON_MAINNET:
      return polygon_mainnet_alchemy_client;
    case ETHEREUM_MAINNET:
        return ethereum_mainnet_alchemy_client;
    default:
      return polygon_mainnet_alchemy_client;
  }
}

export async function getLatestBlock() {
  const block = await polygon_mainnet_alchemy_client.core.getBlockNumber();
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
