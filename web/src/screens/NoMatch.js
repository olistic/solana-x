import React from 'react';

import { styled } from '../stitches.config';

const StyledP = styled('p', {
  fontFamily: '$mono',
  margin: 0,
  textAlign: 'center',
});

function NoMatch() {
  return <StyledP>There&apos;s nothing here!</StyledP>;
}

export default NoMatch;
