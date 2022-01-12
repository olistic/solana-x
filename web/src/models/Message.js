import { formatRelative, toDate } from 'date-fns';

export default class Message {
  constructor(publicKey, author, timestamp, content) {
    this.publicKey = publicKey;
    this.author = author;
    this.timestamp = timestamp.toNumber();
    this.content = content;
  }

  get key() {
    return this.publicKey.toBase58();
  }

  get createdAt() {
    return formatRelative(toDate(this.timestamp * 1000), new Date());
  }
}
