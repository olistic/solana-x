import React from 'react';

import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import TweetForm from './components/TweetForm';
import TweetList from './components/TweetList';
import useProfile from './hooks/useProfile';
import useTweets from './hooks/useTweets';
import useWallet from './hooks/useWallet';
import { styled } from './stitches.config';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const ScrollableContainer = styled('div', {
  flex: 1,
  overflowY: 'auto',
});

const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  margin: '$4 auto 0',
  maxWidth: '480px',
  width: '100%',
});

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

function App() {
  const { connected } = useWallet();
  const { loaded, profile } = useProfile();
  const hasProfile = !!profile;

  return (
    <Container>
      <Header />
      <ScrollableContainer>
        <Main>
          {!connected && <NotConnected />}
          {connected && loaded && !hasProfile && <NoProfile />}
          {connected && loaded && hasProfile && <ConnectedAndProfile />}
        </Main>
      </ScrollableContainer>
    </Container>
  );
}

export default App;
