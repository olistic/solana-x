import { web3 } from '@project-serum/anchor';

import Message from '../models/Message';
import Profile from '../models/Profile';

export const fetchProfile = async ({ program }, publicKey) => {
  const profiles = await program.account.profile.all([
    {
      memcmp: {
        offset: 8, // Discriminator.
        bytes: publicKey.toBase58(),
      },
    },
  ]);

  if (profiles.length === 0) {
    return null;
  }

  const profile = profiles[0];
  return new Profile(profile.publicKey, profile.account.name);
};

export const createProfile = async ({ wallet, program }, name) => {
  const profile = web3.Keypair.generate();
  await program.rpc.createProfile(name, {
    accounts: {
      profile: profile.publicKey,
      owner: wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [profile],
  });
  const profileAccount = await program.account.profile.fetch(profile.publicKey);
  return new Profile(profile.publicKey, profileAccount.name);
};

export const fetchMessages = async ({ program }) => {
  const messages = await program.account.message.all();
  return Promise.all(
    messages.map(async (message) => {
      const messageAccount = message.account;
      const author = await fetchProfile({ program }, messageAccount.author);
      return new Message(
        message.publicKey,
        author,
        messageAccount.timestamp,
        messageAccount.content,
      );
    }),
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
  const author = await fetchProfile({ program }, messageAccount.author);
  return new Message(
    message.publicKey,
    author,
    messageAccount.timestamp,
    messageAccount.content,
  );
};
