import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { useMemo } from 'react';

import idl from '../idl/tutorial.json';
import useAnchorWallet from './useAnchorWallet';
import { RPC_URL } from '../config';

const programID = new PublicKey(idl.metadata.address);

export default function useWorkspace() {
  const wallet = useAnchorWallet();
  const connection = useMemo(() => new Connection(RPC_URL), []);
  const provider = useMemo(
    () => new Provider(connection, wallet),
    [connection, wallet],
  );
  const program = useMemo(
    () => new Program(idl, programID, provider),
    [provider],
  );

  return {
    wallet,
    connection,
    provider,
    program,
  };
}
