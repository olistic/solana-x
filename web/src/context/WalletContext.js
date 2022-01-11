import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  connectPhantomWallet,
  disconnectPhantomWallet,
  getPhantomWallet,
  getPhantomPublicKey,
} from '../utils/phantom';

const WalletContext = React.createContext();

// TODO: Support other wallets beside Phantom.
export function WalletProvider({ children }) {
  const [publicKey, setPublicKey] = useState(null);

  // Try to auto-connect on load.
  useEffect(() => {
    const onLoad = async () => {
      setPublicKey(await getPhantomPublicKey());
    };
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
    };
  }, []);

  const connect = useCallback(async () => {
    await connectPhantomWallet();
    setPublicKey(await getPhantomPublicKey());
  }, []);

  const disconnect = useCallback(async () => {
    await disconnectPhantomWallet();
    setPublicKey(null);
  }, []);

  const wallet = getPhantomWallet();
  const {
    signAndSendTransaction: sendTransaction,
    signTransaction,
    signAllTransactions,
    signMessage,
  } = wallet || {};

  const value = useMemo(
    () => ({
      connected: !!publicKey,
      // connecting, // TODO.
      // disconnecting, // TODO.
      connect,
      disconnect,
      publicKey,
      sendTransaction,
      signTransaction,
      signAllTransactions,
      signMessage,
    }),
    [
      connect,
      disconnect,
      publicKey,
      sendTransaction,
      signTransaction,
      signAllTransactions,
      signMessage,
    ],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export default WalletContext;
