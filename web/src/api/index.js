import { web3 } from '@project-serum/anchor';

import Message from '../models/Message';

export const fetchMessages = async ({ program }) => {
  const messages = await program.account.message.all();
  return messages.map(
    (message) => new Message(message.publicKey, message.account),
  );
};

export const postMessage = async ({ wallet, program }, content) => {
  const message = web3.Keypair.generate();
  await program.rpc.postMessage(content, {
    accounts: {
      message: message.publicKey,
      author: wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [message],
  });
  const messageAccount = await program.account.message.fetch(message.publicKey);
  return new Message(message.publicKey, messageAccount);
};
