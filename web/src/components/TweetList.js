import React from 'react';

import Avatar from './Avatar';
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
  fontSize: '$5',
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
  fontSize: '$4',
  margin: '$1 0 0',
});

function Tweet({ author, content, createdAt }) {
  return (
    <StyledArticle>
      <Avatar id={author} />
      <Container>
        <StyledHeader>
          <Author>{author}</Author>
          <CreatedAt>• {createdAt}</CreatedAt>
        </StyledHeader>
        <Content>{content}</Content>
      </Container>
    </StyledArticle>
  );
}

const StyledList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
});

const StyledItem = styled('li', {
  listStyle: 'none',
  '& + &': {
    borderTop: '1px solid $gray200',
  },
});

function TweetList({ tweets }) {
  return (
    <StyledList>
      {tweets.map((message) => (
        <StyledItem key={message.key}>
          <Tweet
            author={message.author.name}
            content={message.content}
            createdAt={message.createdAt}
          />
        </StyledItem>
      ))}
    </StyledList>
  );
}

export default TweetList;