const CLUSTER = process.env.REACT_APP_CLUSTER;
export const CLUSTER_URL =
  CLUSTER === 'mainnet'
    ? 'https://api.mainnet-beta.solana.com'
    : CLUSTER === 'devnet'
    ? 'https://api.devnet.solana.com'
    : 'http://localhost:8899';

export const PREFLIGHT_COMMITMENT = 'processed';

export const COMMITMENT = 'processed';
