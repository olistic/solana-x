export default class Profile {
  constructor(publicKey, name) {
    this.publicKey = publicKey;
    this.name = name;
  }

  get key() {
    return this.publicKey.toBase58();
  }
}
