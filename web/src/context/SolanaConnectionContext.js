import React, { useMemo } from 'react';
import { Connection } from '@solana/web3.js';

import { RPC_URL } from '../config';

const SolanaConnectionContext = React.createContext();

export const SolanaConnectionProvider = ({ children }) => {
  const connection = useMemo(() => new Connection(RPC_URL), []);

  return (
    <SolanaConnectionContext.Provider value={connection}>
      {children}
    </SolanaConnectionContext.Provider>
  );
};

export default SolanaConnectionContext;
