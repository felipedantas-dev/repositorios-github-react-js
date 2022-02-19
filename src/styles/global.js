import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  *:focus {
    outline: 0;
  }
  
  html, body, #root {
    min-height: 100%;
    background: #909090;
  }
  
  body {
    background: #0D2636;
    font: 14px 'Roboto', sans-serif;
    -webkit-font-smoothing: antialised !important;
  }
  
  a {
    text-decoration: none;
  }
  
  ul {
    list-style: none;
  }
  
  button {
    cursor: pointer;
  }
`;