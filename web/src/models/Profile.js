export default class Profile {
  constructor(publicKey, owner, name) {
    this.publicKey = publicKey;
    this.owner = owner;
    this.name = name;
  }

  get key() {
    return this.publicKey.toBase58();
  }
}
