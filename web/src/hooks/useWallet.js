import { useContext } from 'react';

import WalletContext from '../context/WalletContext';

export default function useWallet() {
  const context = useContext(WalletContext);
  if (typeof context === 'undefined') {
    throw new Error('useWallet must be used within a WalletProvider');
  }

  return context;
}
