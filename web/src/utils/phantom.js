/**
 * Fetches the Phantom wallet.
 *
 * @returns {object|null} The Phantom wallet object, or `null` if Phantom is not installed..
 */
export const getPhantomWallet = () => {
  const { solana } = window;
  if (!solana || !solana.isPhantom) {
    return null;
  }

  return solana;
};

/**
 * Checks if the Phantom wallet is installed.
 *
 * @returns {boolean} Whether the Phantom wallet is installed or not.
 */
export const checkPhantomWalletInstalled = () => !!getPhantomWallet();

/**
 * Fetches the Phantom wallet account's public key.
 *
 * @returns {string|null} The Phantom wallet account's public key, or `null` if it cannot be found.
 */
export const getPhantomPublicKey = async () => {
  try {
    const phantomWallet = getPhantomWallet();
    const response = await phantomWallet.connect({ onlyIfTrusted: true });
    return response.publicKey;
  } catch (err) {
    return null;
  }
};

/**
 * Connects to the Phantom wallet of the user.
 */
export const connectPhantomWallet = async () => {
  try {
    const phantomWallet = getPhantomWallet();
    await phantomWallet.connect();
  } catch (err) {
    // Ignore error.
  }
};

/**
 * Disconnects from the Phantom wallet of the user.
 */
export const disconnectPhantomWallet = async () => {
  try {
    const phantomWallet = getPhantomWallet();
    await phantomWallet.disconnect();
  } catch (err) {
    // Ignore error.
  }
};
