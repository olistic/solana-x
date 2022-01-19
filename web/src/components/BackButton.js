import React from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '../stitches.config';

const StyledButton = styled('button', {
  border: 'none',
  cursor: 'pointer',
  fontFamily: '$source',
  fontSize: '$2',
  fontWeight: 600,
  padding: 0,
  size: '$4',
  textAlign: 'left',

  '&:focus': {
    outline: 'none',
  },
});

function BackButton() {
  const navigate = useNavigate();

  return <StyledButton onClick={() => navigate(-1)}>⟵</StyledButton>;
}

export default BackButton;
