import { createStitches } from '@stitches/react';

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {
      hiContrast: 'hsl(206,10%,5%)',
      loContrast: 'white',

      gray100: 'hsl(206,22%,99%)',
      gray200: 'hsl(206,12%,97%)',
      gray300: 'hsl(206,11%,92%)',
      gray400: 'hsl(206,10%,84%)',
      gray500: 'hsl(206,10%,76%)',
      gray600: 'hsl(206,10%,44%)',
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
      9: '72px',
      10: '80px',
    },
    space: {
      1: '8px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '40px',
      6: '48px',
    },
    fontSizes: {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '20px',
      5: '24px',
      6: '32px',
    },
    fonts: {
      mono: 'Fira Mono, monospace',
      poppins: 'Poppins, sans-serif',
      source: 'Source Sans Pro, sans-serif',
    },
  },
  utils: {
    marginX: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    size: (value) => ({
      width: value,
      height: value,
    }),
  },
});
