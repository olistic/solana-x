import type { PublicKey } from '@solana/web3.js';

export class Profile {
  owner: PublicKey;
  name: string;

  constructor(publicKey: PublicKey, owner: PublicKey, name: string) {
    this.owner = owner;
    this.name = name;
  }

  get id(): string {
    return this.owner.toBase58();
  }
}
