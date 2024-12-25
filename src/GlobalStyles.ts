import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Noto Sans", sans-serif;
    font-size: ${props => props.theme.font.regular};
    background-color: ${props => props.theme.primary.main};
    height: 100%;
    overflow: hidden;
  }

  #root {
    height: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :where(ul, ol):where([class]) {
    padding-left: 0;
  }

  body,
  :where(blockquote, figure):where([class]) {
    margin: 0;
  }

  :where(h1, h2, h3, h4, h5, h6, p, ul, ol, dl):where([class]) {
    margin-block: 0;
  }

  :where(dd[class]) {
    margin-left: 0;
  }

  :where(ul[class]) {
    list-style: none;
  }

  img {
    display: block;
    max-width: 100%;
  }

  input, textarea, button, select {
    font: inherit;
  }

  html {
    height: 100%;
    scroll-behavior: smooth;
  }

  body {
    min-height: 100%;
    line-height: 1.5;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`

export default GlobalStyles