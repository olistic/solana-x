import React from 'react';

import { MessagesProvider } from './MessagesContext';
import { WalletProvider } from './WalletContext';

function AppContext({ children }) {
  return (
    <WalletProvider>
      <MessagesProvider>{children}</MessagesProvider>
    </WalletProvider>
  );
}

export default AppContext;
