import { web3 } from '@project-serum/anchor';

import Profile from '../models/Profile';
import Tweet from '../models/Tweet';

export const getProfile = async ({ program }, ownerPublicKey) => {
  const ownerFilter = {
    memcmp: {
      offset: 8, // Discriminator.
      bytes: ownerPublicKey.toBase58(),
    },
  };

  const profiles = await program.account.profile.all([ownerFilter]);

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

export const fetchTweets = async ({ program }) => {
  const tweets = await program.account.tweet.all();
  return Promise.all(
    tweets.map(async (tweet) => {
      const tweetAccount = tweet.account;

      const authorPublicKey = tweetAccount.author;
      const author = await getProfile({ program }, authorPublicKey);

      return new Tweet(
        tweet.publicKey,
        author,
        tweetAccount.timestamp,
        tweetAccount.content,
      );
    }),
  );
};

export const sendTweet = async ({ wallet, program }, content) => {
  const tweet = web3.Keypair.generate();

  await program.rpc.sendTweet(content, {
    accounts: {
      tweet: tweet.publicKey,
      author: wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [tweet],
  });

  const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

  const authorPublicKey = tweetAccount.author;
  const author = await getProfile({ program }, authorPublicKey);

  return new Tweet(
    tweet.publicKey,
    author,
    tweetAccount.timestamp,
    tweetAccount.content,
  );
};
