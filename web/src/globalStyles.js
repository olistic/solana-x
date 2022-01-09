import 'sanitize.css';
import 'sanitize.css/assets.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/reduce-motion.css';
import 'sanitize.css/typography.css';
import { globalCss } from '@stitches/react';

const globalStyles = globalCss({
  body: {
    backgroundColor: '$background',
    fontFamily: '$source',
    fontSize: '1rem',
  },
});

export default globalStyles;
