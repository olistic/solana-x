import type { BN } from '@coral-xyz/anchor';
import type { PublicKey } from '@solana/web3.js';
import { formatRelative } from 'date-fns';

import type { Profile } from './profile';

export class Post {
  publicKey: PublicKey;
  author: Profile;
  timestamp: number;
  content: string;

  constructor(
    publicKey: PublicKey,
    author: Profile,
    timestamp: BN,
    content: string,
  ) {
    this.publicKey = publicKey;
    this.author = author;
    this.timestamp = timestamp.toNumber() * 1000;
    this.content = content;
  }

  get id(): string {
    return this.publicKey.toBase58();
  }

  get createdAt(): string {
    return formatRelative(new Date(this.timestamp), new Date());
  }
}
