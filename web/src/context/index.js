import React from 'react';

import { PhantomWalletProvider } from './PhantomWalletContext';
import { SolanaConnectionProvider } from './SolanaConnectionContext';

function AppContext({ children }) {
  return (
    <SolanaConnectionProvider>
      <PhantomWalletProvider>{children}</PhantomWalletProvider>
    </SolanaConnectionProvider>
  );
}

export default AppContext;
