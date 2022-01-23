import 'sanitize.css';
import 'sanitize.css/assets.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/reduce-motion.css';
import 'sanitize.css/typography.css';
import '@solana/wallet-adapter-react-ui/styles.css';

import { globalCss } from '../stitches.config';

const global = globalCss({
  body: {
    backgroundColor: '$loContrast',
    color: '$hiContrast',
    fontFamily: '$source',
    fontSize: '1rem',
    height: '100vh',
    overflow: 'hidden',

    '& > [data-reactroot]': {
      height: '100%',
    },
  },

  '.wallet-adapter-button': {
    backgroundColor: '$hiContrast !important',
    border: 'none !important',
    borderRadius: '0 !important',
    color: '$loContrast !important',
    cursor: 'pointer !important',
    fontFamily: '$poppins !important',
    fontSize: '$2 !important',
    fontWeight: '600 !important',
    height: '$6 !important',
    lineHeight: '1 !important',
    letterSpacing: '0.3px !important',
    padding: '0 $4 !important',
  },
});

export default global;
