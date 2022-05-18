import { useWallet } from '@solana/wallet-adapter-react';

import MaybeLink from './MaybeLink';
import ProfilePicture from './ProfilePicture';
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
  color: '$gray600',
  fontSize: '$2',
  lineHeight: 1,
  margin: '0 0 0 $1',
  position: 'relative',
  textTransform: 'lowercase',
  top: '1px', // Adjust vertical alignment.
});

const Content = styled('p', {
  fontSize: '$3',
  margin: '$1 0 0',
});

export default function TweetCard({ author, content, createdAt, id }) {
  const { publicKey } = useWallet();
  const isCurrentUserAuthor =
    publicKey && publicKey.toBase58() === author.owner.toBase58();
  const authorLink = isCurrentUserAuthor ? '/profile' : `/authors/${author.id}`;

  const tweetLink = `/tweets/${id}`;

  return (
    <StyledArticle>
      <ProfilePicture publicKey={author.owner} />
      <Container>
        <StyledHeader>
          <Author>
            <MaybeLink href={authorLink}>{author.name}</MaybeLink>
          </Author>
          <CreatedAt>
            • <MaybeLink href={tweetLink}>{createdAt}</MaybeLink>
          </CreatedAt>
        </StyledHeader>
        <Content>{content}</Content>
      </Container>
    </StyledArticle>
  );
}
