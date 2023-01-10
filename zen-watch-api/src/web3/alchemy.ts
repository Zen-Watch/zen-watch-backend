import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: 'vurnWXm-h9aSA14aLO_CU7gYzeFpiCoy',
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);

export async function getLatestBlock() {
  const block = await alchemy.core.getBlockNumber();
  return block;
}
