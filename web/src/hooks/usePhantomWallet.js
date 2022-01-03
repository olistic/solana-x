import { useContext } from 'react';

import PhantomWalletContext from '../context/PhantomWalletContext';

const usePhantomWallet = () => {
  const context = useContext(PhantomWalletContext);
  if (typeof context === 'undefined') {
    throw new Error(
      'usePhantomWallet must be used within a PhantomWalletProvider',
    );
  }

  return context;
};

export default usePhantomWallet;
