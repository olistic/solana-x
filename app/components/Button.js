import { styled } from '../stitches.config';

const Button = styled('button', {
  backgroundColor: '$hiContrast',
  border: 'none',
  color: '$loContrast',
  cursor: 'pointer',
  fontFamily: '$poppins',
  fontSize: '$2',
  fontWeight: 600,
  height: '$6',
  letterSpacing: '0.3px',
  padding: '0 $4',

  '&:focus': {
    outline: 'none',
  },
});

export default Button;
