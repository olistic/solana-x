import React from 'react';

import { styled } from '../stitches.config';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '$4',
});

const Name = styled('h1', {
  fontSize: '$6',
  fontWeight: 600,
  lineHeight: 1,
  margin: '0 0 $1',
});

const PublicKey = styled('p', {
  color: '$gray800',
  fontFamily: '$mono',
  fontSize: '$2',
  lineHeight: 1,
  margin: 0,
});

function AuthorHeader({ author }) {
  return (
    <Container>
      <Name>{author.name}</Name>
      <PublicKey>{author.owner.toBase58()}</PublicKey>
    </Container>
  );
}

export default AuthorHeader;
