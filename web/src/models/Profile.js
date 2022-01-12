export default class Profile {
  constructor(publicKey, accountData) {
    this.publicKey = publicKey;
    this.owner = accountData.owner;
    this.name = accountData.name;
  }

  get key() {
    return this.publicKey.toBase58();
  }
}
