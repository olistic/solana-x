import BackButton from './BackButton';
import DetailHeader from './DetailHeader';
import { styled } from '../stitches.config';

const Wrapper = styled('div', {
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

export default function TweetHeader() {
  return (
    <DetailHeader>
      <Wrapper>
        <BackButton />
        <Title>Tweet</Title>
      </Wrapper>
    </DetailHeader>
  );
}
