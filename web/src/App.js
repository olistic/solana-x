import React, { useEffect, useState } from 'react';

import useSolanaConnection from './hooks/useSolanaConnection';

const App = () => {
  const connection = useSolanaConnection();

  const [nodeVersion, setNodeVersion] = useState();
  useEffect(() => {
    const updateVersion = async () => {
      const versionInfo = await connection.getVersion();
      setNodeVersion(versionInfo['solana-core']);
    };

    updateVersion();
  });

  const connected = !!nodeVersion;

  return (
    <div>
      <p>
        {connected
          ? `Connected to Solana node running version ${nodeVersion}.`
          : 'Not connected.'}
      </p>
    </div>
  );
};

export default App;
