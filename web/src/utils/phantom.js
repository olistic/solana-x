const getPhantomWallet = () => {
  const { solana } = window;
  if (!solana || !solana.isPhantom) {
    return null;
  }

  return solana;
};

/**
 * Checks if the Phantom wallet is installed.
 *
 * @returns {boolean} Whether the user has the Phantom wallet installed or not.
 */
export const checkPhantomWalletInstalled = () => !!getPhantomWallet();

/**
 * Fetches the Phantom wallet address of the user.
 *
 * @returns {string|null} The Phantom wallet address, or `null` if it cannot be found.
 */
export const getPhantomWalletAddress = async () => {
  try {
    const phantomWallet = getPhantomWallet();
    const response = await phantomWallet.connect({ onlyIfTrusted: true });
    return response.publicKey.toString();
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
