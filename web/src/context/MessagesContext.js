import React, { useCallback, useEffect, useMemo, useState } from 'react';

import useWorkspace from '../hooks/useWorkspace';
import { fetchMessages, postMessage } from '../api';

const MessagesContext = React.createContext();

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const workspace = useWorkspace();

  // Update messages on workspace changes.
  useEffect(() => {
    const updateMessages = async () => {
      const fetchedMessages = await fetchMessages(workspace);
      const sortedMessages = fetchedMessages.sort(
        (a, b) => b.timestamp - a.timestamp,
      );
      setMessages(sortedMessages);
    };

    updateMessages();
  }, [workspace]);

  const postMessageAndUpdate = useCallback(
    async (content) => {
      const newMessage = await postMessage(workspace, content);
      setMessages([newMessage, ...messages]);
    },
    [workspace, messages],
  );

  const value = useMemo(
    () => ({
      messages,
      postMessage: postMessageAndUpdate,
    }),
    [messages, postMessageAndUpdate],
  );

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
}

export default MessagesContext;
