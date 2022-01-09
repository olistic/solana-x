import React from 'react';

import Header from './components/Header';
import MessageList from './components/MessageList';
import dummyMessages from './dummyMessages';
import { styled } from './stitches.config';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '$4 auto 0',
  maxWidth: '480px',
});

function App() {
  return (
    <div>
      <Header />
      <Container>
        <MessageList messages={dummyMessages} />
      </Container>
    </div>
  );
}

export default App;
