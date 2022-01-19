import React, { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useParams } from 'react-router-dom';

import NoMatch from './NoMatch';
import TweetCard from '../components/TweetCard';
import TweetHeader from '../components/TweetHeader';
import useWorkspace from '../hooks/useWorkspace';
import { getTweet } from '../api';

function Tweet() {
  const { tweetId } = useParams();

  const [tweet, setTweet] = useState(null);

  const [loaded, setLoaded] = useState(false);

  const workspace = useWorkspace();
  useEffect(() => {
    const updateTweet = async () => {
      const fetchedTweet = await getTweet(workspace, new PublicKey(tweetId));
      setTweet(fetchedTweet);
    };

    updateTweet().then(() => setLoaded(true));
  }, [workspace, tweetId]);

  if (!loaded) {
    // TODO: Render spinner.
    return null;
  }

  if (!tweet) {
    return <NoMatch />;
  }

  return (
    <>
      <TweetHeader />
      <TweetCard
        author={tweet.author}
        content={tweet.content}
        createdAt={tweet.createdAt}
        id={tweet.id}
      />
    </>
  );
}

export default Tweet;
