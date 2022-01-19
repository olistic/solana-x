import React from 'react';

import BackButton from './BackButton';
import PageHeader from './PageHeader';
import { styled } from '../stitches.config';

const Container = styled('div', {
  alignItems: 'center',
  display: 'flex',
  marginBottom: '$1',
});

const Name = styled('h1', {
  fontSize: '$6',
  fontWeight: 600,
  lineHeight: 1.25,
  margin: '0 0 0 $1',
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
    <PageHeader>
      <Container>
        <BackButton />
        <Name>{author.name}</Name>
      </Container>
      <PublicKey>{author.owner.toBase58()}</PublicKey>
    </PageHeader>
  );
}

export default AuthorHeader;
