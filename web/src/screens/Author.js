import React, { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useParams } from 'react-router-dom';

import NoMatch from './NoMatch';
import AuthorHeader from '../components/AuthorHeader';
import TweetList from '../components/TweetList';
import useWorkspace from '../hooks/useWorkspace';
import { authorFilter, fetchTweets, getProfile } from '../api';

function Author() {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [tweets, setTweets] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const workspace = useWorkspace();
  useEffect(() => {
    const authorPublicKey = new PublicKey(authorId);

    const updateAuthor = async () => {
      const fetchedAuthor = await getProfile(workspace, authorPublicKey);
      setAuthor(fetchedAuthor);
    };

    const updateTweets = async () => {
      const fetchedTweets = await fetchTweets(workspace, [
        authorFilter(authorPublicKey),
      ]);
      setTweets(fetchedTweets);
    };

    Promise.all([updateAuthor(), updateTweets()]).then(() => setLoaded(true));
  }, [workspace, authorId]);

  if (!loaded) {
    // TODO: Render spinner.
    return null;
  }

  if (!author) {
    return <NoMatch />;
  }

  return (
    <>
      <AuthorHeader author={author} />
      <TweetList tweets={tweets} />
    </>
  );
}

export default Author;
