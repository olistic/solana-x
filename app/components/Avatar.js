import { getAvatarSrc } from '../utils/avatars';
import { styled } from '../stitches.config';

const StyledImg = styled('img', {
  variants: {
    size: {
      sm: {
        size: '$5',
      },
      md: {
        size: '$7',
      },
      lg: {
        size: '$9',
      },
    },
  },
});

export default function Avatar({ id, size = 'md' }) {
  return <StyledImg alt="" src={getAvatarSrc(id)} size={size} />;
}
