export const RPC_URL = process.env.REACT_APP_RPC_URL;

export const PROGRAM_ID = process.env.REACT_APP_PROGRAM_ID;

export const PAYER_SECRET_KEY = Uint8Array.from(
  process.env.REACT_APP_PAYER_SECRET_KEY.split(','),
);
