/* eslint-disable import/prefer-default-export */

export const condensePublicKey = (publicKey) =>
  `${publicKey.slice(0, 4)}..${publicKey.slice(-4)}`;
