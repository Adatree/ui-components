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
    background-color: #ffffff;
  }

  body {
    background-color: #ffffff;
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

  a:link, a:visited {
    color: #1b0dab;
  }

  .margin-tp-xs {
    margin-top: 0.8rem;
  }
  .margin-tp-sm {
    margin-top: 1.2rem;
  }
  .margin-tp-md {
    margin-top: 3.2rem;
  }
  .margin-tp-lg {
    margin-top: 6rem;
  }

  .margin-bt-xs {
    margin-top: 0.8rem;
  }
  .margin-bt-sm {
    margin-bottom: 1.2rem;
  }
  .margin-bt-md {
    margin-bottom: 3.2rem;
  }
  .margin-bt-lg {
    margin-bottom: 6rem;
  }
`;
