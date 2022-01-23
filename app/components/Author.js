import Head from 'next/head';
import { useEffect, useState } from 'react';

import AuthorHeader from './AuthorHeader';
import NoMatch from './NoMatch';
import TweetList from './TweetList';
import useWorkspace from '../hooks/useWorkspace';
import { authorFilter, fetchTweets, getProfile } from '../client';

export default function Author({ publicKey }) {
  const [author, setAuthor] = useState(null);
  const [tweets, setTweets] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const workspace = useWorkspace();
  useEffect(() => {
    const updateAuthor = async () => {
      const fetchedAuthor = await getProfile(workspace, publicKey);
      setAuthor(fetchedAuthor);
    };

    const updateTweets = async () => {
      const fetchedTweets = await fetchTweets(workspace, [
        authorFilter(publicKey),
      ]);
      setTweets(fetchedTweets);
    };

    if (publicKey) {
      Promise.all([updateAuthor(), updateTweets()]).then(() => setLoaded(true));
    }
  }, [workspace, publicKey]);

  if (!loaded) {
    // TODO: Render spinner.
    return null;
  }

  if (!author) {
    return <NoMatch />;
  }

  return (
    <>
      <Head>
        <title>solana twitter • {author.name}</title>
      </Head>
      <AuthorHeader author={author} />
      <TweetList tweets={tweets} />
    </>
  );
}
