import React from 'react';

import Header from './components/Header';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import dummyMessages from './dummyMessages';
import { styled } from './stitches.config';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '$4 auto 0',
  maxWidth: '480px',
});

const MessageFormWrapper = styled('div', {
  marginBottom: '$4',
});

function App() {
  return (
    <div>
      <Header />
      <Container>
        <MessageFormWrapper>
          <MessageForm />
        </MessageFormWrapper>
        <MessageList messages={dummyMessages} />
      </Container>
    </div>
  );
}

export default App;
