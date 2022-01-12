import { formatRelative, toDate } from 'date-fns';

import { condensePublicKey } from '../utils/publicKeys';

export default class Message {
  constructor(publicKey, accountData) {
    this.publicKey = publicKey;
    this.author = accountData.author;
    this.timestamp = accountData.timestamp.toNumber();
    this.content = accountData.content;
  }

  get key() {
    return this.publicKey.toBase58();
  }

  get authorDisplay() {
    return condensePublicKey(this.author.toBase58());
  }

  get createdAt() {
    return formatRelative(toDate(this.timestamp * 1000), new Date());
  }
}
