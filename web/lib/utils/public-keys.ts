export function condensePublicKey(publicKey: string): string {
  return `${publicKey.slice(0, 4)}..${publicKey.slice(-4)}`;
}
