import React from 'react';

import { WalletProvider } from './WalletContext';

function AppContext({ children }) {
  return <WalletProvider>{children}</WalletProvider>;
}

export default AppContext;
