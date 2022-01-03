import React, { useEffect, useState } from 'react';
import {
  Keypair,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';

import useSolanaConnection from './hooks/useSolanaConnection';
import { PAYER_SECRET_KEY, PROGRAM_ID } from './config';

function App() {
  const connection = useSolanaConnection();

  const [nodeVersion, setNodeVersion] = useState();
  useEffect(() => {
    const updateVersion = async () => {
      const versionInfo = await connection.getVersion();
      setNodeVersion(versionInfo['solana-core']);
    };

    updateVersion();
  });

  const handleSendTransactionClick = async () => {
    const transaction = new Transaction().add(
      new TransactionInstruction({
        keys: [],
        programId: PROGRAM_ID,
      }),
    );
    const payerAccount = Keypair.fromSecretKey(PAYER_SECRET_KEY);
    await sendAndConfirmTransaction(connection, transaction, [payerAccount]);
  };

  const connected = !!nodeVersion;

  return (
    <div>
      <p>
        {connected
          ? `Connected to Solana node running version ${nodeVersion}.`
          : 'Not connected.'}
      </p>
      <button onClick={handleSendTransactionClick} type="button">
        Send Transaction
      </button>
    </div>
  );
}

export default App;
