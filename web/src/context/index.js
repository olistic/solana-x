import React from 'react';

import { TweetsProvider } from './TweetsContext';
import { ProfileProvider } from './ProfileContext';
import { WalletProvider } from './WalletContext';

function AppContext({ children }) {
  return (
    <WalletProvider>
      <ProfileProvider>
        <TweetsProvider>{children}</TweetsProvider>
      </ProfileProvider>
    </WalletProvider>
  );
}

export default AppContext;
