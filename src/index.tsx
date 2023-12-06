import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createGlobalStyle} from "styled-components";

// Global Styles
const GlobalStyles =  createGlobalStyle`
  *{
    box-sizing: border-box;
    border: 0;
    padding: 0;
    font-family: Macbook,sans-serif;
  }
  
`

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <>
    <GlobalStyles />
    <App />
  </>

);


