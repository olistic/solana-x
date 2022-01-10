import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  checkPhantomWalletInstalled,
  connectPhantomWallet,
  getPhantomWalletAddress,
} from '../utils/phantom';

const PhantomWalletContext = React.createContext();

export function PhantomWalletProvider({ children }) {
  const [hasWallet, setHasWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const onLoad = async () => {
      setHasWallet(checkPhantomWalletInstalled());
      setWalletAddress(await getPhantomWalletAddress());
    };
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
    };
  }, []);

  const connectWallet = useCallback(async () => {
    await connectPhantomWallet();
    setWalletAddress(await getPhantomWalletAddress());
  }, []);

  const value = useMemo(
    () => ({
      connectWallet,
      hasWallet,
      isWalletConnected: !!walletAddress,
      walletAddress,
    }),
    [connectWallet, hasWallet, walletAddress],
  );

  return (
    <PhantomWalletContext.Provider value={value}>
      {children}
    </PhantomWalletContext.Provider>
  );
}

export default PhantomWalletContext;
