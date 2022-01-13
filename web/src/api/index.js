import { BN, web3 } from '@project-serum/anchor';

import Profile from '../models/Profile';
import Tweet from '../models/Tweet';

const getProfilePDA = (ownerPublicKey, programId) =>
  web3.PublicKey.findProgramAddress(
    [ownerPublicKey.toBuffer(), Buffer.from('profile')],
    programId,
  );

export const getProfile = async ({ program }, ownerPublicKey) => {
  const [profilePublicKey] = await getProfilePDA(
    ownerPublicKey,
    program.programId,
  );

  const profileAccount = await program.account.profile.fetchNullable(
    profilePublicKey,
  );
  if (!profileAccount) {
    return null;
  }

  return new Profile(
    profilePublicKey,
    profileAccount.owner,
    profileAccount.name,
  );
};

export const createProfile = async ({ wallet, program }, name) => {
  const ownerPublicKey = wallet.publicKey;

  const [profilePublicKey, bump] = await getProfilePDA(
    ownerPublicKey,
    program.programId,
  );

  await program.rpc.createProfile(new BN(bump), name, {
    accounts: {
      profile: profilePublicKey,
      owner: ownerPublicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [],
  });

  const profileAccount = await program.account.profile.fetch(profilePublicKey);

  return new Profile(
    profilePublicKey,
    profileAccount.owner,
    profileAccount.name,
  );
};

export const fetchTweets = async ({ program }) => {
  const tweets = await program.account.tweet.all();
  return Promise.all(
    tweets.map(async (tweet) => {
      const tweetAccount = tweet.account;

      const authorPublicKey = tweetAccount.author;
      const authorProfile = await getProfile({ program }, authorPublicKey);

      return new Tweet(
        tweet.publicKey,
        authorProfile,
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
  const authorProfile = await getProfile({ program }, authorPublicKey);

  return new Tweet(
    tweet.publicKey,
    authorProfile,
    tweetAccount.timestamp,
    tweetAccount.content,
  );
};
