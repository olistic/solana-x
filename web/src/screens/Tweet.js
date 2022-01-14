import React, { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useParams } from 'react-router-dom';

import NoMatch from './NoMatch';
import TweetCard from '../components/TweetCard';
import useWorkspace from '../hooks/useWorkspace';
import { getTweet } from '../api';

function Tweet() {
  const { tweetId } = useParams();

  const [tweet, setTweet] = useState(null);

  const workspace = useWorkspace();
  useEffect(() => {
    const updateTweet = async () => {
      const fetchedTweet = await getTweet(workspace, new PublicKey(tweetId));
      setTweet(fetchedTweet);
    };

    updateTweet();
  }, [workspace, tweetId]);

  if (!tweet) {
    return <NoMatch />;
  }

  return (
    <TweetCard
      author={tweet.author.name}
      content={tweet.content}
      createdAt={tweet.createdAt}
      id={tweet.id}
    />
  );
}

export default Tweet;
