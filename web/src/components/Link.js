import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { styled } from '../stitches.config';

const StyledLink = styled('a', {
  color: 'inherit',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
});

function Link(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledLink as={ReactRouterLink} {...props} />;
}

export default Link;
