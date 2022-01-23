import BackButton from './BackButton';
import DetailHeader from './DetailHeader';
import { styled } from '../stitches.config';

const Wrapper = styled('div', {
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
  color: '$gray600',
  fontFamily: '$mono',
  fontSize: '$2',
  lineHeight: 1,
  margin: 0,
});

export default function AuthorHeader({ author }) {
  return (
    <DetailHeader>
      <Wrapper>
        <BackButton />
        <Name>{author.name}</Name>
      </Wrapper>
      <PublicKey>{author.owner.toBase58()}</PublicKey>
    </DetailHeader>
  );
}
