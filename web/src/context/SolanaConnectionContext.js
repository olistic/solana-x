import React, { useMemo } from 'react';
import { Connection } from '@solana/web3.js';

const rpcUrl = 'http://localhost:8899';
const commitmentLevel = 'confirmed';

const SolanaConnectionContext = React.createContext();

export const SolanaConnectionProvider = ({ children }) => {
  const connection = useMemo(() => new Connection(rpcUrl, commitmentLevel), []);

  return (
    <SolanaConnectionContext.Provider value={connection}>
      {children}
    </SolanaConnectionContext.Provider>
  );
};

export default SolanaConnectionContext;
