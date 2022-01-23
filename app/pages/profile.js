import { useWallet } from '@solana/wallet-adapter-react';

import Author from '../components/Author';

export default function Profile() {
  const { publicKey } = useWallet();

  return <Author publicKey={publicKey} />;
}
