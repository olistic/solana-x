import React from 'react';

import Header from './components/Header';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import ProfileForm from './components/ProfileForm';
import useMessages from './hooks/useMessages';
import useProfile from './hooks/useProfile';
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

const MessageFormWrapper = styled('div', {
  marginBottom: '$4',
});

function NotConnected() {
  const { messages } = useMessages();

  return <MessageList messages={messages} />;
}

function NoProfile() {
  const { createProfile } = useProfile();

  return <ProfileForm onSubmit={createProfile} />;
}

function ConnectedAndProfile() {
  const { messages, postMessage } = useMessages();

  return (
    <>
      <MessageFormWrapper>
        <MessageForm onSubmit={postMessage} />
      </MessageFormWrapper>
      <MessageList messages={messages} />
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
          {loaded && !connected && <NotConnected />}
          {loaded && connected && !hasProfile && <NoProfile />}
          {loaded && connected && hasProfile && <ConnectedAndProfile />}
        </Main>
      </ScrollableContainer>
    </Container>
  );
}

export default App;
