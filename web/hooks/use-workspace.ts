import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';

import { COMMITMENT, PROGRAM_ID } from '@/lib/constants';
import { IDL } from '@/lib/idl/solana_x';
import type { Workspace } from '@/lib/web3';

export default function useWorkspace(): Workspace | null {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const provider = useMemo(
    () =>
      wallet
        ? new AnchorProvider(connection, wallet, {
            commitment: COMMITMENT,
            preflightCommitment: COMMITMENT,
          })
        : undefined,
    [connection, wallet],
  );
  const program = useMemo(
    () => (provider ? new Program(IDL, PROGRAM_ID, provider) : undefined),
    [provider],
  );
  const workspace = useMemo(
    () =>
      connection && wallet && provider && program
        ? {
            connection,
            program,
            provider,
            wallet,
          }
        : null,
    [connection, program, provider, wallet],
  );
  return workspace;
}
