import { styled } from '../stitches.config';

const StyledP = styled('p', {
  fontFamily: '$mono',
  margin: 0,
  textAlign: 'center',
});

export default function NoMatch() {
  return <StyledP>There&apos;s nothing here!</StyledP>;
}
