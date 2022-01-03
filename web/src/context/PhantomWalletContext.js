import React, { useEffect, useMemo, useState } from 'react';

import { checkPhantomWalletInstalled } from '../utils/phantom';

const PhantomWalletContext = React.createContext();

export function PhantomWalletProvider({ children }) {
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      setHasWallet(checkPhantomWalletInstalled());
    };
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
    };
  }, []);

  const value = useMemo(
    () => ({
      hasWallet,
    }),
    [hasWallet],
  );

  return (
    <PhantomWalletContext.Provider value={value}>
      {children}
    </PhantomWalletContext.Provider>
  );
}

export default PhantomWalletContext;
