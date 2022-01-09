import { styled } from '../stitches.config';

const Button = styled('button', {
  backgroundColor: '$foreground',
  border: 'none',
  color: '$white',
  cursor: 'pointer',
  fontFamily: '$poppins',
  fontSize: '$2',
  fontWeight: 600,
  height: '$6',
  letterSpacing: '0.3px',
  paddingX: '$4',
  paddingY: 0,

  '&:focus': {
    outline: 'none',
  },
});

export default Button;
