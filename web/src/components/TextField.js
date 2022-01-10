import React from 'react';

import { styled } from '../stitches.config';

const StyledInput = styled('input', {
  $$borderColor: 'transparent',
  backgroundColor: '$gray100',
  border: '1px solid $$borderColor',
  height: '$6',
  fontFamily: '$mono',
  padding: '0 $2',

  '&:focus': {
    $$borderColor: '$colors$foreground',
    outline: 'none',
  },
});

function TextField(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledInput autoComplete="off" type="text" {...props} />;
}

export default TextField;
