import NextLink from 'next/link';

import { styled } from '../stitches.config';

const StyledLink = styled('a', {
  color: 'inherit',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
});

export default function Link({ href, ...otherProps }) {
  return (
    <NextLink href={href} passHref>
      <StyledLink {...otherProps} />
    </NextLink>
  );
}
