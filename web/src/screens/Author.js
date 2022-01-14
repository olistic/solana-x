import React, { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useParams } from 'react-router-dom';

import NoMatch from './NoMatch';
import AuthorHeader from '../components/AuthorHeader';
import TweetList from '../components/TweetList';
import useWallet from '../hooks/useWallet';
import useWorkspace from '../hooks/useWorkspace';
import { authorFilter, fetchTweets, getProfile } from '../api';

function Author() {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [tweets, setTweets] = useState([]);

  const [loaded, setLoaded] = useState(false);

  const workspace = useWorkspace();
  const { publicKey } = useWallet();
  useEffect(() => {
    // `authorId` is `undefined` in `/profile`, fall back to the public key.
    const authorPublicKey = authorId ? new PublicKey(authorId) : publicKey;

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
  }, [workspace, publicKey, authorId]);

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
