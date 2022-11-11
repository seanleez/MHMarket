import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import FloorContextProvider from './context/FloorContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </React.StrictMode>
  <BrowserRouter>
    <SnackbarProvider maxSnack={3}>
      <FloorContextProvider>
        <App />
      </FloorContextProvider>
    </SnackbarProvider>
  </BrowserRouter>
);
