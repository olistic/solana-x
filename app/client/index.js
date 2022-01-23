import { BN, web3 } from '@project-serum/anchor';

import Profile from '../models/Profile';
import Tweet from '../models/Tweet';

const getProfilePDA = ({ program }, ownerPublicKey) =>
  web3.PublicKey.findProgramAddress(
    [ownerPublicKey.toBuffer(), Buffer.from('profile')],
    program.programId,
  );

// eslint-disable-next-line no-unused-vars
const buildProfile = ({ program }, publicKey, profileAccount) => {
  const { owner, name } = profileAccount;
  return new Profile(publicKey, owner, name);
};

export const getProfile = async ({ program }, ownerPublicKey) => {
  const [publicKey] = await getProfilePDA({ program }, ownerPublicKey);

  const profileAccount = await program.account.profile.fetchNullable(publicKey);
  if (!profileAccount) {
    return null;
  }

  return buildProfile({ program }, publicKey, profileAccount);
};

export const createProfile = async ({ wallet, program }, name) => {
  const ownerPublicKey = wallet.publicKey;

  const [publicKey, bump] = await getProfilePDA({ program }, ownerPublicKey);

  await program.rpc.createProfile(new BN(bump), name, {
    accounts: {
      profile: publicKey,
      owner: ownerPublicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [],
  });

  const profileAccount = await program.account.profile.fetch(publicKey);
  return buildProfile({ program }, publicKey, profileAccount);
};

const buildTweet = async ({ program }, publicKey, tweetAccount) => {
  const { author: authorPublicKey, timestamp, content } = tweetAccount;
  const author = await getProfile({ program }, authorPublicKey);
  return new Tweet(publicKey, author, timestamp, content);
};

export const authorFilter = (authorPublicKey) => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: authorPublicKey.toBase58(),
  },
});

export const fetchTweets = async ({ program }, filters = []) => {
  const tweets = await program.account.tweet.all(filters);
  return Promise.all(
    tweets.map((tweet) =>
      buildTweet({ program }, tweet.publicKey, tweet.account),
    ),
  );
};

export const getTweet = async ({ program }, publicKey) => {
  const tweetAccount = await program.account.tweet.fetch(publicKey);
  return buildTweet({ program }, publicKey, tweetAccount);
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
  return buildTweet({ program }, tweet.publicKey, tweetAccount);
};
