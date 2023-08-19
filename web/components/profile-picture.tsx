'use client';

import { useConnection } from '@solana/wallet-adapter-react';
import type { PublicKey } from '@solana/web3.js';
import { getProfilePicture } from '@solflare-wallet/pfp';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface ProfilePictureProps {
  publicKey: PublicKey;
  className?: string;
}

export default function ProfilePicture({
  publicKey,
  className,
}: ProfilePictureProps) {
  const [src, setSrc] = useState<string | null>(null);

  const { connection } = useConnection();
  useEffect(() => {
    const updateProfilePicture = async () => {
      const { url } = await getProfilePicture(connection, publicKey);
      setSrc(url);
    };
    updateProfilePicture();
  }, [connection, publicKey]);

  if (!src) {
    return null;
  }

  return (
    <Image className={className} alt="" src={src} height={40} width={40} />
  );
}
