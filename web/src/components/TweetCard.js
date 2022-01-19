import React from 'react';

import Avatar from './Avatar';
import MaybeLink from './MaybeLink';
import useWallet from '../hooks/useWallet';
import { styled } from '../stitches.config';

const StyledArticle = styled('article', {
  display: 'flex',
  paddingY: '$2',
});

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '$2',
});

const StyledHeader = styled('header', {
  alignItems: 'center',
  display: 'flex',
  fontFamily: '$mono',
});

const Author = styled('h1', {
  fontSize: '$4',
  fontWeight: 600,
  lineHeight: 1,
  margin: 0,
  textTransform: 'lowercase',
});

const CreatedAt = styled('p', {
  color: '$gray500',
  fontSize: '$2',
  lineHeight: 1,
  margin: '0 0 0 $1',
  position: 'relative',
  textTransform: 'lowercase',
  top: '1px', // Adjust vertical alignment.
});

const Content = styled('p', {
  color: '$gray800',
  fontSize: '$3',
  margin: '$1 0 0',
});

function TweetCard({ author, content, createdAt, id }) {
  const { publicKey } = useWallet();
  const authorLink =
    publicKey && publicKey.toBase58() === author.owner.toBase58()
      ? '/profile' // Tweet belongs to current user.
      : `/authors/${author.id}`;

  const tweetLink = `/tweets/${id}`;

  return (
    <StyledArticle>
      <Avatar id={author.name} />
      <Container>
        <StyledHeader>
          <Author>
            <MaybeLink to={authorLink}>{author.name}</MaybeLink>
          </Author>
          <CreatedAt>
            • <MaybeLink to={tweetLink}>{createdAt}</MaybeLink>
          </CreatedAt>
        </StyledHeader>
        <Content>{content}</Content>
      </Container>
    </StyledArticle>
  );
}

export default TweetCard;
