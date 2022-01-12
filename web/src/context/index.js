import React from 'react';

import { MessagesProvider } from './MessagesContext';
import { ProfileProvider } from './ProfileContext';
import { WalletProvider } from './WalletContext';

function AppContext({ children }) {
  return (
    <WalletProvider>
      <ProfileProvider>
        <MessagesProvider>{children}</MessagesProvider>
      </ProfileProvider>
    </WalletProvider>
  );
}

export default AppContext;
