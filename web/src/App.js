import React from 'react';

import usePhantomWallet from './hooks/usePhantomWallet';

function App() {
  const { hasWallet } = usePhantomWallet();

  return (
    <div>
      <h1>Solana Web3 Tutorial</h1>
      {hasWallet && <p>Phantom wallet found!</p>}
    </div>
  );
}

export default App;
