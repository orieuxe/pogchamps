import { createBreakpoints } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const fonts = {
  heading: 'Inter',
  body: 'Inter',
  mono: `'Menlo', monospace`,
};

const config = {
  initialColorMode: 'light' as const,
  useSystemColorMode: true,
  cssVarPrefix: '',
};

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '48em',
  lg: '64em',
  xl: '80em',
  '2xl': '96em',
});

const theme = extendTheme({
  config,
  fonts,
  styles: {
    global: (props) => ({
      '#__next': {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
      '.bg-color': {
        backgroundColor: mode('white', '#2b2a44')(props),
      },
      '.text-color': {
        color: mode('black', 'rgba(210,209,236,1)')(props),
      },
      '.tile-color': {
        backgroundColor: mode('white', '#222148')(props),
      },
      '.box-color': {
        color: mode('rgba(0, 0, 0, 0.12)', 'white')(props),
      },
      '.clickable:hover': {
        backgroundColor: mode('lightgrey', 'brand')(props),
        cursor: 'pointer',
        opacity: 0.95,
        transition: '0.2s',
      },
    })
  },
  shadows: {
    outline: '0px 0px 0px 3px rgba(66,153,225,0.75)',
  },
  breakpoints,
  colors: {
    brand: '#6e468f'
  }
});

export default theme;
