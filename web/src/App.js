import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import dummyMessages from './dummyMessages';
import usePhantomWallet from './hooks/usePhantomWallet';
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
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // TODO: Fetch messages from Solana.
    setMessages(dummyMessages);
  }, []);

  const { isWalletConnected } = usePhantomWallet();

  const handleMessagePost = async (newMessage) => {
    // TODO: Store message in Solana.
    setMessages([newMessage, ...messages]);
  };

  return (
    <div>
      <Header />
      <Container>
        {isWalletConnected && (
          <MessageFormWrapper>
            <MessageForm onMessagePost={handleMessagePost} />
          </MessageFormWrapper>
        )}
        <MessageList messages={messages} />
      </Container>
    </div>
  );
}

export default App;
