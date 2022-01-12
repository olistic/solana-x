import { PublicKey } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { useMemo } from 'react';

import idl from '../idl/tutorial.json';
import useAnchorWallet from './useAnchorWallet';
import useConnection from './useConnection';
import { COMMITMENT, PREFLIGHT_COMMITMENT } from '../config';

const programID = new PublicKey(idl.metadata.address);

export default function useWorkspace() {
  const wallet = useAnchorWallet();
  const connection = useConnection();
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
