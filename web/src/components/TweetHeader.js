import React from 'react';

import BackButton from './BackButton';
import PageHeader from './PageHeader';
import { styled } from '../stitches.config';

const Container = styled('div', {
  alignItems: 'center',
  display: 'flex',
});

const Title = styled('h1', {
  fontSize: '$6',
  fontWeight: 600,
  lineHeight: 1.25,
  margin: '0 0 0 $1',
  textTransform: 'lowercase',
});

function TweetHeader() {
  return (
    <PageHeader>
      <Container>
        <BackButton />
        <Title>Tweet</Title>
      </Container>
    </PageHeader>
  );
}

export default TweetHeader;
