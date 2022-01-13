import React, { useCallback, useEffect, useMemo, useState } from 'react';

import useWorkspace from '../hooks/useWorkspace';
import { fetchTweets, sendTweet } from '../api';

const TweetsContext = React.createContext();

export function TweetsProvider({ children }) {
  const [tweets, setTweets] = useState([]);

  const workspace = useWorkspace();

  // Update tweets on workspace changes.
  useEffect(() => {
    const updateTweets = async () => {
      const fetchedTweets = await fetchTweets(workspace);
      const sortedTweets = fetchedTweets.sort(
        (a, b) => b.timestamp - a.timestamp,
      );
      setTweets(sortedTweets);
    };

    updateTweets();
  }, [workspace]);

  const sendTweetAndUpdate = useCallback(
    async (content) => {
      const newTweet = await sendTweet(workspace, content);
      setTweets([newTweet, ...tweets]);
    },
    [workspace, tweets],
  );

  const value = useMemo(
    () => ({
      tweets,
      sendTweet: sendTweetAndUpdate,
    }),
    [tweets, sendTweetAndUpdate],
  );

  return (
    <TweetsContext.Provider value={value}>{children}</TweetsContext.Provider>
  );
}

export default TweetsContext;
