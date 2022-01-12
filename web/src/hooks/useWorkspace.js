import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { useMemo } from 'react';

import idl from '../idl/tutorial.json';
import useAnchorWallet from './useAnchorWallet';
import { COMMITMENT, CLUSTER_URL, PREFLIGHT_COMMITMENT } from '../config';

const programID = new PublicKey(idl.metadata.address);

export default function useWorkspace() {
  const wallet = useAnchorWallet();
  const connection = useMemo(() => new Connection(CLUSTER_URL, COMMITMENT), []);
  const provider = useMemo(
    () =>
      new Provider(connection, wallet, {
        preflightCommitment: PREFLIGHT_COMMITMENT,
        commitment: COMMITMENT,
      }),
    [connection, wallet],
  );
  const program = useMemo(
    () => new Program(idl, programID, provider),
    [provider],
  );
  const workspace = useMemo(
    () => ({
      wallet,
      connection,
      provider,
      program,
    }),
    [wallet, connection, provider, program],
  );
  return workspace;
}
