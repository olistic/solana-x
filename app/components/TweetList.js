import TweetCard from './TweetCard';
import { styled } from '../stitches.config';

const StyledList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
});

const StyledItem = styled('li', {
  listStyle: 'none',
  '& + &': {
    borderTop: '1px solid $gray300',
  },
});

export default function TweetList({ tweets }) {
  return (
    <StyledList>
      {tweets.map((tweet) => (
        <StyledItem key={tweet.id}>
          <TweetCard
            author={tweet.author}
            content={tweet.content}
            createdAt={tweet.createdAt}
            id={tweet.id}
          />
        </StyledItem>
      ))}
    </StyledList>
  );
}
