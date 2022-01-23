import { Program, Provider } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';

import idl from '../idl/solana_twitter.json';

const programId = new PublicKey(idl.metadata.address);
const commitment = process.env.NEXT_PUBLIC_SOLANA_COMMITMENT;

export default function useWorkspace() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const provider = useMemo(
    () =>
      new Provider(connection, wallet, {
        commitment,
        preflightCommitment: commitment,
      }),
    [connection, wallet],
  );
  const program = useMemo(
    () => new Program(idl, programId, provider),
    [provider],
  );
  const workspace = useMemo(
    () => ({
      connection,
      program,
      provider,
      wallet,
    }),
    [connection, program, provider, wallet],
  );
  return workspace;
}
