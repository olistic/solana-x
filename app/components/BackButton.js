import { useRouter } from 'next/router';

import { styled } from '../stitches.config';

const Icon = styled('span', {
  display: 'block',
});

const StyledButton = styled('button', {
  border: 'none',
  cursor: 'pointer',
  fontFamily: '$source',
  fontSize: '$2',
  fontWeight: 600,
  padding: 0,
  size: '$4',
  textAlign: 'left',
  transform: 'translateX(0)',

  '&:focus': {
    outline: 'none',
  },

  [`& > ${Icon}`]: {
    transform: 'translateX(0)',
    transition: 'transform 150ms ease',
  },

  [`&:hover > ${Icon}`]: {
    transform: 'translateX(-4px)',
  },
});

export default function BackButton() {
  const router = useRouter();

  return (
    <StyledButton onClick={() => router.back()}>
      <Icon>⟵</Icon>
    </StyledButton>
  );
}
