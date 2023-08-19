'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

import Link from './link';
import Wallet from './wallet';

// Prevent hydration issues with `@solana/wallet-adapter-react-ui`.
const ConnectButton = dynamic(() => import('./connect-button'), { ssr: false });

export default function Header() {
  const { connected } = useWallet();

  return (
    <header className="flex h-20 items-center justify-between px-8">
      <h1 className="m-0 text-2xl leading-none">
        <Link href="/">X</Link>
      </h1>
      {connected ? <Wallet /> : <ConnectButton />}
    </header>
  );
}
