export default class Profile {
  constructor(publicKey, owner, name) {
    this.owner = owner;
    this.name = name;
  }

  get id() {
    return this.owner.toBase58();
  }
}
