import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      background: '#fafafa',
      foreground: '#231f20',

      gray100: 'rgba(0, 0, 0, 0.1)',
      gray500: 'rgba(0, 0, 0, 0.5)',
      gray800: 'rgba(0, 0, 0, 0.85)',

      white: '#ffffff',
    },
    sizes: {
      1: '8px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '40px',
      6: '48px',
      7: '56px',
      8: '64px',
    },
    space: {
      1: '8px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '40px',
      6: '48px',
      7: '56px',
      8: '64px',
    },
    fontSizes: {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '18px',
      5: '20px',
      6: '30px',
    },
    fonts: {
      mono: 'Fira Mono, monospace',
      poppins: 'Poppins, sans-serif',
      source: 'Source Sans Pro, sans-serif',
    },
  },
  utils: {
    marginX: (value) => ({ marginLeft: value, marginRight: value }),
    marginY: (value) => ({ marginTop: value, marginBottom: value }),
    paddingX: (value) => ({ paddingLeft: value, paddingRight: value }),
    paddingY: (value) => ({ paddingTop: value, paddingBottom: value }),
    size: (value) => ({ width: value, height: value }),
  },
});
