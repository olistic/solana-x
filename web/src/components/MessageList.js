import React from 'react';
import { formatRelative, toDate } from 'date-fns';

import { getAvatarSrc } from '../utils/avatars';
import { styled } from '../stitches.config';

const StyledArticle = styled('article', {
  display: 'flex',
  paddingY: '$2',
});

const Avatar = styled('img', {
  size: '$7',
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

const Timestamp = styled('p', {
  color: '$gray500',
  fontSize: '$3',
  lineHeight: 1,
  margin: '0 0 0 $1',
  textTransform: 'lowercase',
});

const Content = styled('p', {
  color: '$gray800',
  fontSize: '$4',
  margin: '$1 0 0',
});

function Message({ author, content, timestamp }) {
  const now = new Date();

  return (
    <StyledArticle>
      <Avatar src={getAvatarSrc(author)} />
      <Container>
        <StyledHeader>
          <Author>{author}</Author>
          <Timestamp>{formatRelative(toDate(timestamp * 1000), now)}</Timestamp>
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

function MessageList({ messages }) {
  return (
    <StyledList>
      {messages.map((message) => (
        <StyledItem key={`${message.author}${message.timestamp}`}>
          <Message
            author={message.author}
            content={message.content}
            timestamp={message.timestamp}
          />
        </StyledItem>
      ))}
    </StyledList>
  );
}

export default MessageList;
