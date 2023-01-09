import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: 'vurnWXm-h9aSA14aLO_CU7gYzeFpiCoy',
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);

export function getLatestBlock() {
  return alchemy.core.getBlockNumber().then(console.log);
}
