import React from 'react';

import Header from './components/Header';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import useMessages from './hooks/useMessages';
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

function App() {
  const { connected } = useWallet();

  const { messages, postMessage } = useMessages();

  return (
    <Container>
      <Header />
      <ScrollableContainer>
        <Main>
          {connected && (
            <MessageFormWrapper>
              <MessageForm onMessagePost={postMessage} />
            </MessageFormWrapper>
          )}
          <MessageList messages={messages} />
        </Main>
      </ScrollableContainer>
    </Container>
  );
}

export default App;
