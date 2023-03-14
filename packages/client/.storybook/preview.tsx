import React from 'react';
import { type Preview } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '../src/lib/styles';
import { GlobalStyle } from '../src/GlobalStyle';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
