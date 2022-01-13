import React from 'react';

import ProfileForm from '../components/ProfileForm';
import TweetForm from '../components/TweetForm';
import TweetList from '../components/TweetList';
import useProfile from '../hooks/useProfile';
import useTweets from '../hooks/useTweets';
import useWallet from '../hooks/useWallet';
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
  marginBottom: '$4',
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

function Home() {
  const { connected } = useWallet();
  const { loaded, profile } = useProfile();
  const hasProfile = !!profile;

  if (!connected) {
    return <NotConnected />;
  }

  if (connected && loaded && !hasProfile) {
    return <NoProfile />;
  }

  if (connected && loaded && hasProfile) {
    return <ConnectedAndProfile />;
  }

  return null;
}

export default Home;
