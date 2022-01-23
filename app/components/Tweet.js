import Head from 'next/head';
import { useEffect, useState } from 'react';

import NoMatch from './NoMatch';
import TweetCard from './TweetCard';
import TweetHeader from './TweetHeader';
import useWorkspace from '../hooks/useWorkspace';
import { getTweet } from '../client';

export default function Tweet({ publicKey }) {
  const [tweet, setTweet] = useState(null);

  const [loaded, setLoaded] = useState(false);

  const workspace = useWorkspace();
  useEffect(() => {
    const updateTweet = async () => {
      const fetchedTweet = await getTweet(workspace, publicKey);
      setTweet(fetchedTweet);
    };

    updateTweet().then(() => setLoaded(true));
  }, [workspace, publicKey]);

  if (!loaded) {
    // TODO: Render spinner.
    return null;
  }

  if (!tweet) {
    return <NoMatch />;
  }

  return (
    <>
      <Head>
        <title>solana twitter • tweet</title>
      </Head>
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
