import React, { useEffect, useState } from 'react';

import useSolanaConnection from '../hooks/useSolanaConnection';

const Connection = () => {
  const [version, setVersion] = useState();

  const connection = useSolanaConnection();

  useEffect(() => {
    const updateVersion = async () => {
      const fetchedVersion = await connection.getVersion();
      setVersion(fetchedVersion);
    };

    updateVersion();
  });

  if (!version) {
    return null;
  }

  return (
    <p>
      Connected to Solana fullnode running version {version['solana-core']}.
    </p>
  );
};

export default Connection;
