import { styled } from '../stitches.config';

const StyledInput = styled('input', {
  $$borderColor: 'transparent',
  backgroundColor: '$gray200',
  border: '1px solid $$borderColor',
  color: '$hiContrast',
  height: '$6',
  fontFamily: '$mono',
  padding: '0 $2',

  '&:focus': {
    $$borderColor: '$colors$hiContrast',
    outline: 'none',
  },
});

export default function TextField(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledInput autoComplete="off" type="text" {...props} />;
}
