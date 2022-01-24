import Head from 'next/head';
import { useWallet } from '@solana/wallet-adapter-react';

import ProfileForm from './ProfileForm';
import TweetForm from './TweetForm';
import TweetList from './TweetList';
import useProfile from '../hooks/useProfile';
import useTweets from '../hooks/useTweets';
import { styled } from '../stitches.config';

function NotConnected() {
  const { tweets } = useTweets();

  return <TweetList tweets={tweets} />;
}

function NoProfile() {
  const { createProfile } = useProfile();

  return <ProfileForm onSubmit={createProfile} />;
}

const TweetFormWrapper = styled('div', {
  marginBottom: '$2',
});

function ConnectedAndProfile() {
  const { tweets, sendTweet } = useTweets();

  return (
    <>
      <TweetFormWrapper>
        <TweetForm onSubmit={sendTweet} />
      </TweetFormWrapper>
      <TweetList tweets={tweets} />
    </>
  );
}

export default function Home() {
  const { connected } = useWallet();

  const { loaded, profile } = useProfile();
  const hasProfile = !!profile;

  let Content = () => null;
  if (!connected) {
    Content = NotConnected;
  } else if (connected && loaded && !hasProfile) {
    Content = NoProfile;
  } else if (connected && loaded && hasProfile) {
    Content = ConnectedAndProfile;
  }

  return (
    <>
      <Head>
        <title>solana twitter</title>
      </Head>
      <Content />
    </>
  );
}
