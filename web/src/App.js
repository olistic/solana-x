import React from 'react';

import usePhantomWallet from './hooks/usePhantomWallet';

function App() {
  const { connectWallet, walletAddress } = usePhantomWallet();

  return (
    <div>
      <h1>Solana Web3 Tutorial</h1>
      {!walletAddress && (
        <button onClick={connectWallet} type="button">
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default App;
