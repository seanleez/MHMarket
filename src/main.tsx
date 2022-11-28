import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthorContextProvider from './context/AuthorContext';
import ContainerContextProvider from './context/ContainerRefContext';
import FloorContextProvider from './context/FloorContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthorContextProvider>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="error">
          <FloorContextProvider>
            <ContainerContextProvider>
              <App />
            </ContainerContextProvider>
          </FloorContextProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </AuthorContextProvider>
  </React.StrictMode>
);
