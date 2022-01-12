import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import useWallet from './hooks/useWallet';
import useWorkspace from './hooks/useWorkspace';
import { fetchMessages, postMessage } from './api';
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
  const workspace = useWorkspace();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const updateMessages = async () => {
      const fetchedMessages = await fetchMessages(workspace);
      setMessages(fetchedMessages);
    };

    updateMessages();
  }, [workspace]);

  const handleMessagePost = async (content) => {
    const newMessage = await postMessage(workspace, content);
    setMessages([newMessage, ...messages]);
  };

  return (
    <Container>
      <Header />
      <ScrollableContainer>
        <Main>
          {connected && (
            <MessageFormWrapper>
              <MessageForm onMessagePost={handleMessagePost} />
            </MessageFormWrapper>
          )}
          <MessageList messages={messages} />
        </Main>
      </ScrollableContainer>
    </Container>
  );
}

export default App;
