import { Theme } from '@mui/material';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  * {
    padding: 0;
    margin: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    font-family: sans-serif;
    font-size: 62.5%;
    box-sizing: border-box;
  }

  body {
    font-size: 1.6rem;
  }

  ol,
  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  a:active {
    color: inherit;
  }
`;
