import { Connection } from '@solana/web3.js';
import { useMemo } from 'react';

import { COMMITMENT, CLUSTER_URL } from '../config';

export default function useConnection() {
  return useMemo(() => new Connection(CLUSTER_URL, COMMITMENT), []);
}
