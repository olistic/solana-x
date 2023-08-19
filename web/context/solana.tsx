'use client';

import { Adapter, WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import type { ConnectionConfig } from '@solana/web3.js';
import { clusterApiUrl } from '@solana/web3.js';

import { COMMITMENT } from '@/lib/constants';

const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);
const config: ConnectionConfig = {
  commitment: COMMITMENT,
};

const wallets: Adapter[] = [
  /**
   * Wallets that implement either of these standards will be available automatically.
   *
   *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
   *     (https://github.com/solana-mobile/mobile-wallet-adapter)
   *   - Solana Wallet Standard
   *     (https://github.com/solana-labs/wallet-standard)
   */
];

export interface SolanaProviderProps {
  children: React.ReactNode;
}

export function SolanaProvider({ children }: SolanaProviderProps) {
  return (
    <ConnectionProvider config={config} endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
